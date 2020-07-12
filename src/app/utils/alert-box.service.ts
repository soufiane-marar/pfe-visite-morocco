import {Injectable} from '@angular/core';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AlertBoxService {


  constructor() {
  }


  /**
   * @description open a message alert
   * @param options
   * @returns Promise
   */
  alert(options: SweetAlertOptions): Promise<any> {
    return Swal.fire(options);
  }

  /**
   * @description open an error http message alert
   * @returns Promise
   * @param error
   */
  error(error: HttpErrorResponse) {
    let message: string = '';
    console.log(Array.isArray(error.error.errors));
    if (error.status == 500) {
      message = '<p>' + error.error.message + '</p>';
    } else {
      message += '<p>';

      if (error.error.errors) {
        if (Array.isArray(error.error.errors)) {
          for (let i = 0; i < error.error.errors.length; i++) {
            message += error.error.errors[i] + '<br/>';
          }
        } else {
          for (let prop in error.error.errors) {
            message += prop + ' : ' + error.error.errors[prop][0] + '<br/>';
          }
        }
      } else {
        message += 'Oops, something went wrong ... try later !';
      }
      message += '</p>';
    }

    if (message.length == 0) {
      message = '<p>Oops, something went wrong ... try later !</p>';
    }

    Swal.fire({
      title: error.status + ' (' + error.statusText + ')',
      html: message,
      icon: 'error',
    });

  }

  /**
   * @description if confirm promise resolves true else it will be false
   * @param titre
   * @param question
   * @returns Promise
   */
  confirm(titre: string, question: string): Promise<boolean> {

    const editedSwal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'ml-3 btn btn-secondary'
      },
      buttonsStyling: false
    });

    return new Promise<any>((resolve, reject) => {

      editedSwal.fire({
        title: '<strong>' + titre + '</strong>',
        icon: 'question',
        text: question,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-check"></i> Confirmer',
        cancelButtonText:
          '<i class="fa fa-close"></i> Annuler'
      })
        .then((result) => {

          if (result.value) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(e => reject(e));
    });

  }


  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
