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
}
