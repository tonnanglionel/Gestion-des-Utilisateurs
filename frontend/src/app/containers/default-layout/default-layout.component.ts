import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';
// import { navItems } from '../../_nav';

import { INavData } from '@coreui/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { ChangePasswordModalComponent } from '../../components/change-password-modal/change-password-modal.component';
import { ROLES } from '../../utils/constants';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems: INavData[];

  constructor(
    public authService: AuthenticationService,
    public notifService: NotificationService,
    public modalService: BsModalService,
    public notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.getNavItems();
  }

  public logout(): void {
    this.authService.logout();
    this.notifService.success('Déconnecté avec succès');
  }

  public getNavItems(): void {
    this.navItems = [];
    this.navItems.push({
      name: 'Tableau de bord',
      url: '/dashboard',
      icon: 'icon-speedometer',
    });
    this.navItems.push({
      name: 'Utilisateurs',
      url: '/users',
      icon: 'icon-user'
    });
  }

  /*public openChangePasswordModal(): void {
    const bsModalRef: BsModalRef = this.modalService.show(ChangePasswordModalComponent, { class: 'modal-secondary' });
    bsModalRef.onHidden.subscribe(() => {
      const changeSuccesfully = bsModalRef.content.isSuccess;
      const isError = bsModalRef.content.isError;
      if (changeSuccesfully) {
        this.notificationService.success('Votre mot de passe a été modifié avec succès!');
      }
      if (isError) {
        const error = bsModalRef.content.error;
        if (error.errorCode === 500 && error.errorText === 'Votre ancien mot de passe est incorrect.') {
          this.notificationService.danger('Echec de la modification votre ancien mot de passe ne correspond pas');
        } else {
          this.notificationService.danger('Echec de la modification du mot de passe, une erreur inconnue s\'est produite');
        }
      }
    })
  }*/

  public toggleMinimize(e): void {
    this.sidebarMinimized = e;
  }
}
