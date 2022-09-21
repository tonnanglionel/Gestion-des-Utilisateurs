import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginData } from '../../additional-models/LoginData';
import { AuthenticationService } from '../../services/authentication.service';
import { NavigationService } from '../../services/navigation.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public passwordType: string = 'password';
  public loginData: LoginData = new LoginData();
  public isLoading: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  constructor(
    public navigationService: NavigationService,
    public authService: AuthenticationService,
    public notificationService: NotificationService,
    public modalService: BsModalService
  ) {}

  public login(): void {
    if(!this.loginData.username) {
      this.notificationService.danger('Veuillez saisir votre nom d\'utilisateur');
      return;
    }
    if(!this.loginData.password) {
      this.notificationService.danger('Veuillez saisir votre nom mot de passe');
      return;
    }
    this.isLoading = true;
    this.authService.login(this.loginData).toPromise().then(res => {
      this.authService.localLogin(res.user, res.token, res.tokenExpiresAt);
      this.navigationService.goTo('/users');
      this.notificationService.success('Vous êtes connecté avec succès');
    }).catch(error => {
      this.notificationService.danger('Login ou mot de passe incorrect ou vérifier votre connexion à internet');
    }).finally(() => {
      this.isLoading = false;
    });
  }


  public toggleViewPasswordBtn(): void {
    this.passwordType = this.passwordType === 'password'? 'text': 'password';
  }
  
  public sendEmailResetPassord(): void {
  
  }
}
