import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserControllerService } from '../../../../generated/index';
import { DateParserService } from '../../../../services/date-parser.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteItemModalComponent } from '../../../../components/delete-item-modal/delete-item-modal.component';
import { NavigationService } from '../../../../services/navigation.service';
import { NotificationService } from '../../../../services/notification.service';
import { CreateUpdateUserModalComponent } from '../../components/create-update-user-modal/create-update-user-modal.component';
import { AuthenticationService } from '../../../../services/authentication.service';
import { STATE } from '../../../../utils/constants';
import { State } from '../../../../additional-models/State';
import { Users } from '../../../../generated/model/users';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
 */
@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {

  @Input() initialUsers: Users[] = [];
  @Input() users: Users[];
  @Input() isLoading: boolean;

  @Output() createOrDeleteOrUpdateItemEvent = new EventEmitter<string>();

  public currentUser: Users = this.authService.getUser();
  public currentDate: string = '';

  public isError: boolean = false;
  public isSuccess: boolean = false;
  public state: State = STATE;

  constructor(
    public dateParserService: DateParserService,
    public modalService: BsModalService,
    public navigationService: NavigationService,
    public notificationService: NotificationService,
    public userService: UserControllerService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentDate = this.dateParserService.parseToLocalFr(new Date());
  }

  public desactivate(item: Users): void {
    item.status = STATE.STATE_DEACTIVATED;
    this.userService.updateUserUsingPOST(item).toPromise().then(
      res => {
        if(res) {
          this.notificationService.success('Utilisateur désactivé avec succès!');
        }
      }
    ).catch(
      error => {
        item.status = STATE.STATE_ACTIVATED;
        this.notificationService.danger('Erreur inconnue: impossible de modifier le status');
      }
    )
  }

  public activate(item: Users): void {
    item.status = STATE.STATE_ACTIVATED;
    this.userService.updateUserUsingPOST(item).toPromise().then(
      res => {
        if(res) {
          this.notificationService.success('Utilisateur activé avec succès!');
        }
      }
    ).catch(
      error => {
        item.status = STATE.STATE_DEACTIVATED;
        this.notificationService.danger('Erreur inconnue: impossible de modifier le status');
      }
    )
  }

  public delete(item: Users): void {
    const initialState = { name: item.username };
    const bsModalRef = this.modalService.show(DeleteItemModalComponent, {initialState, class: 'modal-danger modal-sm'});
    bsModalRef.onHide.subscribe(() => {
      const agree = bsModalRef.content.agree;
      if(agree) {
        this.userService.deleteUserUsingGET(item.userId).toPromise().then(
          res => {
            this.notificationService.success('Supprimer avec succès!');
            this.createOrDeleteOrUpdateItemEvent.emit('delete');
          }
        ).catch(
          error => {
            this.isError = true;
            this.notificationService.danger('Une erreur incon c\'est produite veuillez vérifier votre connexion à internet');
          }
        )
      }
    })
  }

  public create(): void {
    const initialState = { mode: 'CREATE' }
    const bsModalRef: BsModalRef = this.modalService.show(CreateUpdateUserModalComponent, {initialState, class: 'modal-primary modal-lg'});
    bsModalRef.onHidden.subscribe(() => {
      const createdSuccesfully = bsModalRef.content.isSuccess;
      const isError = bsModalRef.content.isError;
      if(createdSuccesfully) {
        this.notificationService.success('Utilisateur crée avec succès!');
        this.createOrDeleteOrUpdateItemEvent.emit('create');
      }
      if(isError) {
        this.notificationService.danger('Echec de la création, une erreur inconnue s\'est produite');
      }
    })
  }

  public update(item: Users): void {
    const initialState = { mode: 'UPDATE', user: item }
    const bsModalRef: BsModalRef = this.modalService.show(CreateUpdateUserModalComponent, {initialState, class: 'modal-secondary modal-lg'});
    bsModalRef.onHidden.subscribe(() => {
      const updatedSuccesfully = bsModalRef.content.isSuccess;
      const isError = bsModalRef.content.isError;
      if(updatedSuccesfully) {
        this.notificationService.success('Les informations ont été modifiées avec succès!');
        this.createOrDeleteOrUpdateItemEvent.emit('update');
      }
      if(isError) {
        this.notificationService.danger('Echec de la mise à jour, une erreur inconnue s\'est produite');
      }
    })
  }


  
  public startSearch(event): void {
    let query: string = event.target.value.toLowerCase();
    query = query.trim();
    if (query && query.trim().length > 0) {
      this.users = this.initialUsers.filter(p => ((p.name? p.name: '') + ' ' + (p.surname? p.surname: '') + ' ' + (p.createdOn? this.displayDate(p.createdOn + ''): '') + ' ' + (p.userEmail? p.userEmail: '') + ' ' + (p.username? p.username: '')).toLowerCase().includes(query));
    } else {
      this.stopSearch();
    }
  }

  public stopSearch(): void {
    this.users = this.initialUsers;
  }

  public displayDate(date: string): string {
    return this.dateParserService.parseToLocalFr(new Date(date));
  }
}
