import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  public set(name: string, value: string, expires_in?: any, cookieDomain?: string, dontUseRootPath?: boolean, sameSite?: any): boolean {

    if (cookieDomain == null) {
      cookieDomain = this.getDefaultDomain();
    }

    const path = dontUseRootPath ? '' : '/';

    const expireMs = this._getExpirationInMs(expires_in);

    let expires = null;
    if(expireMs != null) {
      expires = new Date();
      expires.setTime(expires.getTime() + expireMs);
    }

    let cookieExist = this._setCookieInternal(name, value, path, expires, cookieDomain, sameSite);

    const shouldCookieExist = !expireMs || expireMs > 0;

    if (shouldCookieExist === cookieExist) {
      return true;
    }

    // If failed to set cookie, retry;
    // it might be because the domain is listed as TLD https://data.iana.org/TLD/tlds-alpha-by-domain.txt
    const pageDomain = document.location.hostname;
    cookieExist = this._setCookieInternal(name, value, path, expires, pageDomain, sameSite);

    return cookieExist === shouldCookieExist;
  }

  public get(name: string): string | null {
    return this.getCookie(name);
  }

  public remove(name: string, domain = document.location.hostname): void {
    this._removeFromBaseDomains(name, domain);
    this.set(name, '', -1, '', false);
    this.set(name, '', -1, '', true);
  }

  public getInfiniteExpirationTimeInSeconds() {
    // Set expiration time to 1 years
    return 60 * 60 * 24 * 365;
  }

  public getDefaultDomain(pageDomain = document.location.hostname, baseDomain =  ''): string {
    return baseDomain.length > 0 && pageDomain.length >= baseDomain.length && pageDomain.lastIndexOf(baseDomain) === pageDomain.length - baseDomain.length
      ? baseDomain
      : pageDomain;
  }

  private _getExpirationInMs(expiresIn: any) {

    let expireMs: number | null;
    if (expiresIn == null || expiresIn === '' || isNaN(expiresIn)) {
      expireMs = 1000 * this.getInfiniteExpirationTimeInSeconds();
    } else if (expiresIn == 0) {
      // 0 means Session
      expireMs = null;
    } else {
      // Any other value is number of seconds (A negative value would mean expire now!)
      expireMs = expiresIn * 1000;
    }

    return expireMs;
  }

  private _setCookieInternal(name: string, value: string, path: string, expires: Date | null, cookieDomain: string, sameSiteMode = 'None') {
    const protocol = document.location.protocol;
    const isSecured = protocol.indexOf('https') === 0;

    this.setCookie(name, value, {
      path,
      expires,
      domain: cookieDomain,
      sameSite: sameSiteMode,
      secure: isSecured
    });

    if (this.get(name)) {
      return true;
    }


    return false;
  }

  private _removeFromBaseDomains(name: string, domain: string) {
    const domainParts = domain.split('.');

    // when clearing from a.b.c.d.com --> clear from a.b.c.d.com, b.c.d.com, c.d.com, d.com
    for (let i = 0; i < domainParts.length - 1; i++) {
      const domain = domainParts.slice(i).join('.');
      this.set(name, '', -1, domain, false);
      this.set(name, '', -1, domain, true);
    }
  }

  private static _getSameSiteMode(): any {
    if (!this._disallowSameSiteMode()) return 'None';
  }

  private static _disallowSameSiteMode() {
    const protocol = document.location.protocol;
    const ua = navigator.userAgent.toLowerCase();
    const isSecured = protocol.indexOf('https') === 0;

    return !isSecured || !ua ||
      // Cover all iOS based browsers here. This includes:
      // - Safari on iOS 12 for iPhone, iPod Touch, iPad
      // - WkWebview on iOS 12 for iPhone, iPod Touch, iPad
      // - Chrome on iOS 12 for iPhone, iPod Touch, iPad
      // All of which are broken by SameSite=None, because they use the iOS networking stack
      ((ua.indexOf('CPU iPhone OS 12') > -1 || ua.indexOf('iPad; CPU OS 12') > -1) ||
        // Cover Mac OS X based browsers that use the Mac OS networking stack. This includes:
        // - Safari on Mac OS X.
        // This does not include:
        // - Chrome on Mac OS X
        // Because they do not use the Mac OS networking stack.
        (ua.indexOf('Macintosh; Intel Mac OS X 10_14') > -1 && ua.indexOf('Version/') > -1 && ua.indexOf('Safari') > -1) ||
        // Cover Chrome 50-69, because some versions are broken by SameSite=None,
        // and none in this range require it.
        // Note: this covers some pre-Chromium Edge versions,
        // but pre-Chromium Edge does not require SameSite=None.
        (ua.indexOf('Chrome/5') > -1 && ua.indexOf('Chrome/6') > -1));
  }

  private _fallbackToSameSiteNone(name: string, value: string, path: string, expires: Date, cookieDomain: string, secure: boolean): void {
    this.setCookie(name, value, {
      path,
      expires,
      domain: cookieDomain,
      sameSite: 'None',
      secure
    });
  }


  setCookie(name: string, value: string, options: any) {
    let cookieString = `${name}=${escape(value)}`;
    if(options.path) cookieString += `; path=${options.path}`;
    if(options.expires) cookieString += `; expires=${options.expires.toUTCString()}`;
    if(options.domain && options.domain.indexOf('.') != -1) cookieString += `; domain=${options.domain}`;
    if(options.sameSite) cookieString += `; sameSite=${options.sameSite}`;
    if(options.secure) cookieString += `; secure`;
    window.document.cookie = cookieString;
  }

  getCookie(name: string): string | null {
    name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1').replace(/^[ \t]+|[ \t]+$/g, '');
    const regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)');
    const match = window.document.cookie.match(regex);
    return match && unescape(match[1]);
  }
}
