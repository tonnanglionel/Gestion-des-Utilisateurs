import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AdminGuard } from '../guards/admin.guard';

import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Utilisateurs',
    },
    children: [
      {
        path: '',
        component: ListUserComponent,
        data: {
          title: 'Liste des utilisateurs'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
