import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuardService } from './modules/auth/service/auth-guard.service';

const routes: Routes = [
  {
    path: "",
    // component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "auth",
        pathMatch: "full"
      },
      {
        path: "auth",
        loadChildren: () =>
          import("./modules/auth/auth.module").then(
            m => m.AuthModule
          )
      },
      {
        path: "dashboard",
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
