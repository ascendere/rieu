import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, catchError, from, throwError } from 'rxjs';
import { UserCredential } from '@firebase/auth-types';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.currentUser$ = this.afAuth.authState as Observable<User | null>;
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  signOut(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  sendResetPasswordLink(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async currentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.uid || null;
  }

  async getCurrentUserId(): Promise<string | null> {
    return await this.currentUserId();
  }
}
