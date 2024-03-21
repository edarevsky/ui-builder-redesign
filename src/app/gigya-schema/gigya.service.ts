import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GigyaService {
  // @ts-ignore
  private isGigyaServiceReady: Promise<void>;
  private schema = {
    "callId": "e019f658dd6945cba72103bf056e3ffc",
    "errorCode": 0,
    "apiVersion": 2,
    "statusCode": 200,
    "statusReason": "OK",
    "time": "2024-03-18T13:29:21.802Z",
    "profileSchema": {
      "fields": {
        "education.startYear": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.books.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "photoURL": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "education.school": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "professionalHeadline": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "email": {
          "required": false,
          "format": "regex('^(?=(.{1,64}@.{1,255}))([!#$%&'*+\\-\\/=?\\^_`{|}~a-zA-Z0-9}]{1,64}(\\.[!#$%&'*+\\-\\/=?\\^_`{|}~a-zA-Z0-9]{0,}){0,})@((\\[(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\\])|([a-zA-Z0-9-]{1,63}(\\.[a-zA-Z0-9-]{2,63}){1,}))$')",
          "type": "string",
          "allowNull": true,
          "writeAccess": "clientModify",
          "encrypt": "AES"
        },
        "lastLoginLocation.city": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "oidcData.address.locality": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "favorites.music.category": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.activities.category": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "politicalView": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "certifications.number": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "skills.skill": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "educationLevel": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "religion": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "education.schoolType": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.movies.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "oidcData.address.formatted": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "favorites.music.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "likes.timestamp": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "birthYear": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "clientModify"
        },
        "timezone": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "oidcData.website": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "certifications.authority": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "phones.type": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "likes.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "patents.date": {
          "required": false,
          "type": "date",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.television.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "languages": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.startDate": {
          "required": false,
          "type": "date",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "oidcData.address.country": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "education.fieldOfStudy": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "publications.title": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "publications.summary": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "industry": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "firstName": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "clientModify",
          "encrypt": "AES"
        },
        "address": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "publications.publisher": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "proxyemail": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "favorites.interests.category": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "city": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "publications.url": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "favorites.activities.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.television.id": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "followingCount": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "profileURL": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "phones.number": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "thumbnailURL": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "favorites.movies.category": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.endDate": {
          "required": false,
          "type": "date",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "verified": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.activities.id": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "specialities": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "certifications.endDate": {
          "required": false,
          "type": "date",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.description": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "gender": {
          "required": false,
          "format": "regex('^[fmu]{1}$')",
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "oidcData.updated_at": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "oidcData.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "work.company": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "hometown": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "favorites.books.category": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "phones.default": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "interestedIn": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.interests.id": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.companyID": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "certifications.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "birthMonth": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.music.id": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.books.id": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.television.category": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "followersCount": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "patents.url": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "patents.office": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "birthDay": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "patents.summary": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "oidcData.email_verified": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "certifications.startDate": {
          "required": false,
          "type": "date",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.title": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "oidcData.middle_name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "interests": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.industry": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "lastName": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "clientModify",
          "encrypt": "AES"
        },
        "patents.status": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "locale": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "likes.id": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.companySize": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "skills.years": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "oidcData.phone_number_verified": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "skills.level": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "patents.number": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "relationshipStatus": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "favorites.movies.id": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "education.endYear": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "work.isCurrent": {
          "required": false,
          "type": "boolean",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "likes.time": {
          "required": false,
          "type": "date",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "nickname": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "honors": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "favorites.interests.name": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "lastLoginLocation.country": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "oidcData.zoneinfo": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "age": {
          "required": false,
          "type": "long",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "bio": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "state": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "oidcData.address.street_address": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "oidcData.phone_number": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "oidcData.locale": {
          "required": false,
          "type": "basic-string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "lastLoginLocation.coordinates.lat": {
          "required": false,
          "type": "float",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "lastLoginLocation.coordinates.lon": {
          "required": false,
          "type": "float",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "username": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "zip": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "clientModify",
          "encrypt": "AES"
        },
        "work.location": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "oidcData.address.region": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "publications.date": {
          "required": false,
          "type": "date",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "country": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "clientModify",
          "encrypt": "AES"
        },
        "oidcData.address.postal_code": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        },
        "education.degree": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "likes.category": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "lastLoginLocation.state": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "activities": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly"
        },
        "patents.title": {
          "required": false,
          "type": "string",
          "allowNull": true,
          "writeAccess": "serverOnly",
          "encrypt": "AES"
        }
      },
      "dynamicSchema": false
    },
    "dataSchema": {
      "fields": {
        "terms": {
          "required": false,
          "type": "boolean",
          "allowNull": true,
          "writeAccess": "clientModify"
        },
        "subscribe": {
          "required": false,
          "type": "boolean",
          "allowNull": true,
          "writeAccess": "clientModify"
        }
      },
      "dynamicSchema": true
    },
    "subscriptionsSchema": {
      "fields": {},
      "dynamicSchema": false
    },
    "preferencesSchema": {
      "fields": {}
    },
    "addressesSchema": {
      "fields": {},
      "dynamicSchema": false
    }
  };

  constructor() {
  }

  getSchema(): Observable<any> {
    return of(this.schema);
  }
/*
  async getSchema(): Promise<any> {
    await this.isGigyaReady();

    // @ts-ignore

    return Promise((resolve, reject) => {
      // @ts-ignore
      window.gigya.accounts.getSchema({
        internalSchema: true,
        callback: (res: any) => {
          resolve(res);
        }
      });
    });
  }

  isGigyaReady() {
    if (!this.isGigyaServiceReady) {
      this.isGigyaServiceReady = new Promise((resolve) => {
        // @ts-ignore
        window.onGigyaServiceReady(() => {
          resolve();
        });
      });
    }

    return this.isGigyaServiceReady;
  }*/
}
