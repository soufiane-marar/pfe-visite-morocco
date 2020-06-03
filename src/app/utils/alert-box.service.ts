import {Injectable} from '@angular/core';
import Swal, {SweetAlertOptions} from 'sweetalert2';

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
}
