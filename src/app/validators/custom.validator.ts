import {AbstractControl} from '@angular/forms';

export class CustomValidators {

  static MatchPasswords(control: AbstractControl): { [key: string]: any } | null {

    let password = control.get('password').value;
    let confirmPassword = control.get('password2').value;


    if (password != confirmPassword) {
      control.get('password2').setErrors({match_password: true});
      return {match_password: true};
    }
    return null;
  }

  static CheckLongitude(control: AbstractControl): { [key: string]: any } | null {
    let longitude: number = control.get('longitude').value;

    if (longitude < -180 || longitude > 180) {
      control.get('longitude').setErrors({invalid_val: true});
      return {invalid_val: true};
    }

    return null;
  }

  static CheckLatitude(control: AbstractControl): { [key: string]: any } | null {
    let longitude: number = control.get('latitude').value;

    if (longitude < -85 || longitude > 85) {
      control.get('latitude').setErrors({invalid_val: true});
      return {invalid_val: true};
    }

    return null;
  }
}
