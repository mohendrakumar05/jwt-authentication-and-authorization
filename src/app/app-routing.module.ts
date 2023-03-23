import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo : '/auth', pathMatch: 'full'},
  { 
    path : 'auth', 
    loadChildren : () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path : '',
    component : LayoutComponent,
    canActivate : [AuthGuard],
    children : [
      {
        path: 'user',
        loadChildren : () => import('../app/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
