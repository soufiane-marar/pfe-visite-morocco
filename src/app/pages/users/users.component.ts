import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {forkJoin, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {User} from '../../interfaces/User';
import {Role} from '../../interfaces/Role';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  private subject = new Subject<void>();

  public displayedColumns: string[] = ['fullname', 'role', 'email', 'username', 'actions'];
  public usersSource: any;

  public users: User[] = [];
  public roles: Role[] = [];


  constructor(public usersService: UsersService,
              private alertBoxService: AlertBoxService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.ngxSpinner.show();
    forkJoin([this.usersService.getUsers(), this.usersService.getRoles()])
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.users = value[0];
          this.usersSource = new MatTableDataSource<User>(this.users);
          this.roles = value[1];
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.alert({
            title: 'Données',
            text: error.message,
            icon: 'error'
          });
        }
      );

  }

  private openDialog(isnew: boolean, user: User = null): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '55%',
      disableClose: !isnew,
      data: {isnew: isnew, user: user, roles: this.roles}
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.subject))
      .subscribe(result => {
        console.log('The dialog was closed', result);
        if (result) {
          if (isnew) {
            this.users.push(result);
            this.usersSource = new MatTableDataSource<User>(this.users);
          } else {
            let index = this.users.indexOf(user);

            if (index !== -1) {
              this.users[index] = result;
            }

            this.usersSource = new MatTableDataSource<User>(this.users);
          }
        }
      });
  }

  public addUser(): void {
    this.openDialog(true);
  }

  public editUser(user: User): void {
    user.password = '';
    this.openDialog(false, user);
  }

  public deleteUser(user: User): void {
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer ' + user.firstname + ' ' + user.lastname + ' ?')
      .then(reponse => {
        if (reponse == true) {
          this.ngxSpinner.show();
          this.usersService.deleteUser(user.id)
            .pipe(take(1))
            .subscribe(
              value => {
                this.ngxSpinner.hide();
                console.log(value);

                this.users = this.usersService.removeFromArray<User>(user, this.users);
                this.usersSource = new MatTableDataSource<User>(this.users);

                this.alertBoxService.alert({
                  title: 'Suppression',
                  text: 'Opération terminé avec succé',
                  icon: 'success'
                });
              },
              error => {
                this.ngxSpinner.hide();
                console.log(error);

                this.alertBoxService.alert({
                  title: 'Suppression',
                  text: error.message,
                  icon: 'error'
                });
              }
            );
        }
      });
  }
}
