import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
//firebase imports
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
//angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

//formularios
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//servicios
import { UserService } from './services/user.service';

//app components
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddUserComponent } from './components/admin/users/add-user/add-user.component';
import { ListUserComponent } from './components/admin/users/list-user/list-user.component';
import { NewsComponent } from './components/admin/news/news.component';
import { AddNewsComponent } from './components/admin/news/add-news/add-news.component';
import { ListNewsComponent } from './components/admin/news/list-news/list-news.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { ProjectsComponent } from './components/admin/projects/projects.component';
import { EditNewsComponent } from './components/admin/news/edit-news/edit-news.component';
import { DetailNewsComponent } from './components/admin/news/detail-news/detail-news.component';
import { DetailProjectComponent } from './components/admin/projects/detail-project/detail-project.component';
import { AddProjectComponent } from './components/admin/projects/add-project/add-project.component';
import { EditProjectComponent } from './components/admin/projects/edit-project/edit-project.component';
import { ListProjectsComponent } from './components/admin/projects/list-project/list-project.component';
import { LandingComponent } from './components/landing/landing.component';
import { LandingSidenavComponent } from './components/landing/landing-sidenav/landing-sidenav.component';
import { LandingNewsComponent } from './components/landing/landing-news/landing-news.component';
import { LandingWelcomeComponent } from './components/landing/landing-welcome/landing-welcome.component';
import { LnewsDetailComponent } from './components/landing/landing-news/lnews-detail/lnews-detail.component';
import { LandingStrategicLinesComponent } from './components/landing/landing-strategic-lines/landing-strategic-lines.component';
import { LandingProjectsComponent } from './components/landing/landing-projects/landing-projects.component';
import { LprojectDetailComponent } from './components/landing/landing-projects/lproject-detail/lproject-detail.component';
import { LandingFooterComponent } from './components/landing/landing-footer/landing-footer.component';
import { LnewsListComponent } from './components/landing/landing-news/lnews-list/lnews-list.component';
import { LprojectsListComponent } from './components/landing/landing-projects/lprojects-list/lprojects-list.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { LandingObjetivesComponent } from './components/landing/landing-objetives/landing-objetives.component';
import { LandingREDComponent } from './components/landing/landing-red/landing-red.component';
import { LandingMiembrosComponent } from './components/landing/landing-miembros/landing-miembros.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ListUserComponent,
    UsersComponent,
    AddUserComponent,
    NewsComponent,
    AddNewsComponent,
    ListNewsComponent,
    SidenavComponent,
    ProjectsComponent,
    EditNewsComponent,
    DetailNewsComponent,
    DetailProjectComponent,
    AddProjectComponent,
    EditProjectComponent,
    ListProjectsComponent,
    LandingComponent,
    LandingSidenavComponent,
    LandingNewsComponent,
    LandingWelcomeComponent,
    LnewsDetailComponent,
    LandingStrategicLinesComponent,
    LandingProjectsComponent,
    LprojectDetailComponent,
    LandingFooterComponent,
    LnewsListComponent,
    LprojectsListComponent,
    LoginComponent,
    LandingObjetivesComponent,
    LandingREDComponent,
    LandingMiembrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCRzozKzxBBulE-lrttJA7ALGhymAk28yQ',
      authDomain: 'rieu-liid-58e81.firebaseapp.com',
      projectId: 'rieu-liid-58e81',
      storageBucket: 'rieu-liid-58e81.appspot.com',
      messagingSenderId: '228227015451',
      appId: '1:228227015451:web:58fcc75c1307003606e9be',
      measurementId: 'G-C6KJ70HFED',
    }),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    QuillModule.forRoot(),
    EditorModule,
    CommonModule,
  ],
  providers: [provideClientHydration(), UserService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
