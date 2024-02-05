import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { LandingComponent } from './components/landing/landing.component';
import { AddNewsComponent } from './components/admin/news/add-news/add-news.component';
import { DetailNewsComponent } from './components/admin/news/detail-news/detail-news.component';
import { EditNewsComponent } from './components/admin/news/edit-news/edit-news.component';
import { ListNewsComponent } from './components/admin/news/list-news/list-news.component';
import { NewsComponent } from './components/admin/news/news.component';
import { AddProjectComponent } from './components/admin/projects/add-project/add-project.component';
import { DetailProjectComponent } from './components/admin/projects/detail-project/detail-project.component';
import { EditProjectComponent } from './components/admin/projects/edit-project/edit-project.component';
import { ListProjectsComponent } from './components/admin/projects/list-project/list-project.component';
import { ProjectsComponent } from './components/admin/projects/projects.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LnewsDetailComponent } from './components/landing/landing-news/lnews-detail/lnews-detail.component';
import { LprojectDetailComponent } from './components/landing/landing-projects/lproject-detail/lproject-detail.component';
import { LnewsListComponent } from './components/landing/landing-news/lnews-list/lnews-list.component';
import { LprojectsListComponent } from './components/landing/landing-projects/lprojects-list/lprojects-list.component';
import { LoginComponent } from './components/login/login.component';

const adminRoutes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'news', component: NewsComponent },
  { path: 'addnews', component: AddNewsComponent },
  { path: 'edit-news/:id', component: EditNewsComponent },
  { path: 'detail-news/:id', component: DetailNewsComponent },
  { path: 'list-news', component: ListNewsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'detail-project/:id', component: DetailProjectComponent },
  { path: 'list-project', component: ListProjectsComponent },
  { path: '', redirectTo: 'list-news', pathMatch: 'full' },
];

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: AdminComponent, children: adminRoutes },
  { path: 'landing', component: LandingComponent },
  { path: 'news-detail/:id', component: LnewsDetailComponent},
  { path: 'project-detail/:id', component: LprojectDetailComponent},
  { path: 'lnews-list', component: LnewsListComponent},
  { path: 'lproject-list', component: LprojectsListComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
