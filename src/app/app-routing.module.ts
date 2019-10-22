import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {UserCreateComponent} from './pages/user/user-create/user-create.component';
import {UserViewComponent} from './pages/user/user-view/user-view.component';
import {UserEditComponent} from './pages/user/user-edit/user-edit.component';
import {CreateRoleComponent} from './pages/role/create-role/create-role.component'
import {EditRoleComponent} from './pages/role/edit-role/edit-role.component';
import {ViewRoleComponent} from './pages/role/view-role/view-role.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AuthGuardService} from './services/auth-guard.service';
import {CreateProjectComponent} from './pages/project/create-project/create-project.component'
import {ViewProjectComponent} from './pages/project/view-project/view-project.component'
import {EditProjectComponent} from './pages/project/edit-project/edit-project.component'

const routes: Routes = [{
  path: '',
  component: LoginComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'login',
  component: LoginComponent,
}, {
  path: 'create-user',
  component: UserCreateComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'view-user',
  component: UserViewComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit-user',
  component: UserEditComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'create-role',
  component: CreateRoleComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit-role',
  component: EditRoleComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'view-role',
  component: ViewRoleComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'create-project',
  component: CreateProjectComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'view-project',
  component: ViewProjectComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit-project',
  component: EditProjectComponent,
  canActivate: [AuthGuardService]
}, {
  path: '**',
  component: NotFoundComponent,
  data: {roles: ['all']},
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
