import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../../generated/index';
import { NotificationService } from '../../../services/notification.service';
import { Users } from '../../../generated/model/users';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
 */
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public users: Users[] = [];

  public isLoading: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  constructor(
    public notificationService: NotificationService,
    public userService: UserControllerService
  ) { }

  ngOnInit(): void {
    this.getUsers(true);
  }

  public getUsers(loading?: boolean): void {
    if(loading) this.isLoading = true;
    this.userService.getAllUsersUsingGET().toPromise().then(
      res => {
        if(res) {
          this.isSuccess = true;
          this.users = res;
        }
      }
    ).catch(
      error => {
        this.isError = true;
        this.notificationService.danger('Une erreur inconue c\'est produite veuillez vérifier votre connexion à internet');
      }
    ).finally(
      () => {
        if(loading) this.isLoading = false;
      }
    )
  }

}
