import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {User} from '../../interfaces/User';
import {Role} from '../../interfaces/Role';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {AlertBoxService} from '../../utils/alert-box.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../services/login/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {


  private subject = new Subject<void>();

  public displayedColumns: string[] = ['firstname', 'lastname', 'role', 'email', 'actions'];
  public usersSource: any;

  public users: User[] = [];
  public roles: Role[] = [];


  constructor(public usersService: UsersService,
              private alertBoxService: AlertBoxService,
              private authService: AuthService,
              private ngxSpinner: NgxSpinnerService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.initData();

  }

  public initData(): void {
    this.ngxSpinner.show();

    this.roles = this.usersService.roles;

    this.usersService.getUsers()
      .pipe(takeUntil(this.subject))
      .subscribe(
        value => {

          this.ngxSpinner.hide();
          this.users = value['data'];

          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email == this.authService.getSession().email) {
              this.users.splice(i, 1);
            }
          }

          this.usersSource = new MatTableDataSource<User>(this.users);
        },
        error => {
          this.ngxSpinner.hide();
          console.log(error);
          this.alertBoxService.error(error);
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
          this.initData();
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
    this.alertBoxService.confirm('Suppression', 'êtes-vous sur de supprimer ' + user.first_name + ' ' + user.last_name + ' ?')
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

                this.alertBoxService.error(error);
              }
            );
        }
      });
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
