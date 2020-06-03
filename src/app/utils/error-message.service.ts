import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  private errorMessage: string = '';

  constructor() {
  }


  public setErrorMessage(errorName: string, length?: number): string {

    this.errorMessage = '';

    switch (errorName) {
      case 'required':
        this.errorMessage = '- Champ à remplir obligatoirement !';
        break;

      case 'email' :
        this.errorMessage = '- Format d\'email invalide !';
        break;

      case 'maxlength':
        this.errorMessage = '- Champ ne doit pas dépasser ' + length + ' charactères !';
        break;

      case 'minlength':
        this.errorMessage = '- Champ doit contenir au moins ' + length + ' charactères !';
        break;

      case 'match_password':
        this.errorMessage = '- Les mot de passes doivent être identiques !';
        break;

      default:
        this.errorMessage = '';
    }

    return this.errorMessage;
  }
}
