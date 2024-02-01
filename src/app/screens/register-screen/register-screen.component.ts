import {Component, EventEmitter, Output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.scss'
})
export class RegisterScreenComponent {
  @Output() public submit = new EventEmitter<{ profile: { [key: string]: any } }>();

  profileForm = new FormGroup({
    email: new FormControl('test@test.com'),
    password: new FormControl('test@test.com'),
    age: new FormControl(21)
  });

  public submitForm() {
    debugger
    const formData: { [key: string]: any } = {};

    for (const field in this.profileForm.controls) {
      // @ts-ignore
      formData[field] = this.profileForm.controls[field].value;
    }

    const profileData = {...formData};
    delete profileData['password'];

    const data = {profile: profileData, email: formData['email'], password: formData['password']};

    this.submit.emit(data);
  }
}
