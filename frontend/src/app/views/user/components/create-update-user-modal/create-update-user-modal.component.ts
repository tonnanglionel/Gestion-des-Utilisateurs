import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserControllerService } from '../../../../generated/index';
import { NotificationService } from '../../../../services/notification.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Users } from '../../../../generated/model/users';

/**
 * @author Arléon Zemtsop
 * @email arleonzemtsop@gmail.com
 */
@Component({
  selector: 'app-create-update-user-modal',
  templateUrl: './create-update-user-modal.component.html',
  styleUrls: ['./create-update-user-modal.component.scss']
})
export class CreateUpdateUserModalComponent implements OnInit {

  public mode: string;
  public form = this.fb.group({});

  public user: Users = {};

  public togglePasswordOptions: any = {
    passwordType: 'password',
    confirmPasswordType: 'password'
  }

  public errorMessages = {
    confirmPassword: [
      { type: 'passwordMismatch', message: 'Le mot de passe saisit ne correspond pas' }
    ]
  }

  public isLoading: boolean = false;
  public isError: boolean = false;
  public isSuccess: boolean = false;

  constructor(
    public modalService: BsModalRef,
    private fb: FormBuilder,
    public userService: UserControllerService,
    public notificationService: NotificationService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.form.controls;
  }

  public initForm(): void {
    this.form = this.fb.group({
      userId: [],
      name: ['', Validators.required],
      username: ['', Validators.required],
      userRole: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          this.recheckIfPasswordMatch()
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          this.checkIfPasswordMatch()
        ]
      ]
    });

    if(this.mode === "UPDATE") {
      this.form.patchValue({
        userId: this.user.userId,
        name: this.user.name,
        username: this.user.username,
        userRole: this.user.userRole,
        userEmail: this.user.userEmail,
        password: this.user.password,
        confirmPassword: this.user.password,
      });
    }
  }

  public create(): void {
    //if(this.authService.hasAnyPermission(['CREATE_USER'])) {
      const item: Users = this.form.value;
      this.user.name = item.name;
      this.user.username = item.username;
      this.user.userEmail = item.userEmail;
      this.user.userRole = item.userRole
      this.user.password = item.password;
      this.isLoading = true;
      this.userService.createUserUsingPOST(this.user).toPromise().then(
        res => {
          console.log(res);
          if(res) {
            this.isSuccess = true;
            this.close();
          }
        }
      ).catch(
        error => {
          this.isError = true;
          if(error.status === 400) {
            if(error.error.errorCode === 500 && error.error.errorText === 'UserName already used') {
              this.notificationService.danger('Le nom d\'utilisateur choisit existe déjà veuillez saisir un autre');
            } else if(error.error.errorCode === 500 &&  error.error.errorText === 'Mail already used') {
              this.notificationService.danger('L\'addresse email choisie existe déjà veuillez saisir une autre');
            } else if(error.error.errorCode === 500 && error.error.errorText === 'Phone number already used') {
              this.notificationService.danger('Le numéro de téléphone choisit existe déjà veuillez saisir un autre');
            }
          }
        }
      ).finally(
        () => {
          this.isLoading = false;
        }
      )
    /*} else {
      this.notificationService.danger('Vous n\'êtes pas autorisé à créer un utilisateur');
    }*/
  }

  public update(): void {
    //if(this.authService.hasAnyPermission(['UPDATE_USER_INFOS'])) {
      const item: Users = this.form.value;
      this.user.name = item.name;
      this.user.username = item.username;
      this.user.surname = item.surname;
      this.user.userEmail = item.userEmail;
      this.isLoading = true;
      this.userService.updateUserUsingPOST(this.user).toPromise().then(
        res => {
          console.log(res);
          if(res) {
            this.isSuccess = true;
            this.close();
          }
        }
      ).catch(
        error => {
          this.isError = true;
          if(error.status === 400) {
            if(error.error.errorCode === 500 && error.error.errorText === 'UserName already used') {
              this.notificationService.danger('Le nom d\'utilisateur choisit existe déjà veuillez saisir un autre');
            } else if(error.error.errorCode === 500 && error.error.errorText === 'Mail already used') {
              this.notificationService.danger('L\'addresse email choisie existe déjà veuillez saisir une autre');
            } else if(error.error.errorCode === 500 && error.error.errorText === 'Phone number already used') {
              this.notificationService.danger('Le numéro de téléphone choisit existe déjà veuillez saisir un autre');
            }
          }
        }
      ).finally(
        () => {
          this.isLoading = false;
        }
      )
    /*} else {
      this.notificationService.danger('Vous n\'êtes pas autorisé à modifier les informations d\'un utilisateur');
    }*/
  }

  public checkIfPasswordMatch(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const confirmPassword = control.value;
      let password = '';
      if (this.f.password !== undefined){
        password = this.f.password.value;
      }
      return password !== confirmPassword ? {passwordMismatch: {password: password, confirmPassword: confirmPassword}} : null;
    };
  }

  public recheckIfPasswordMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.f.confirmPassword !== undefined) {
        this.f.confirmPassword.updateValueAndValidity();
      }
      return null;
    };
  }

  public toggleViewPasswordBtn(): void {
    this.togglePasswordOptions.passwordType = this.togglePasswordOptions.passwordType === 'password'? 'text': 'password';
  }

  public toggleViewConfirmPasswordBtn(): void {
    this.togglePasswordOptions.confirmPasswordType = this.togglePasswordOptions.confirmPasswordType === 'password'? 'text': 'password';
  }

  public close(): void {
    this.modalService.hide();
    this.modalService = null;
  }
}
