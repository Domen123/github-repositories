import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component'; 
import { LandingPageComponent } from './landing-page/landing-page.component';
const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'user/:userID', component: UserComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
