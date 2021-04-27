import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import { LoginComponent } from './component/login/login.component';
import { NotesComponent } from './component/notes/notes.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:"",pathMatch:"full", component:IndexComponent},
  {path:"notes", component:NotesComponent,canActivate:[LoginGuard]},
  {path:"notes/:index", component: NotesComponent,canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
