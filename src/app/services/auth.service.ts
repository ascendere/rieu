import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { BehaviorSubject, switchMap, of, Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    ).subscribe(user => this.currentUser$.next(user));
  }

  signInWithEmail(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(error => {
        console.error('Error during email sign-in:', error);
        return throwError(error); 
      })
    );
  }

  signInWithGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      catchError(error => {
        console.error('Error during Google sign-in:', error);
        return throwError(error); 
      }),
      switchMap(userCredential => {
        const user = userCredential.user;
        if (user) { // Verificar si user no es null
          return from(this.userService.getUser(user.uid)).pipe(
            switchMap(existingUser => {
              if (existingUser) {
                // Si el usuario ya existe, simplemente lo redirigimos
                return of(existingUser);
              } else {
                // Si el usuario no existe, creamos un nuevo usuario en Firestore
                const newUser: User = {
                  id: user.uid,
                  name: user.displayName || '',
                  email: user.email || '',
                  role: 'user' // Establece el rol predeterminado para los usuarios nuevos
                };
                return this.userService.createUser(newUser);
              }
            }),
            catchError(error => {
              console.error('Error creating user document in Firestore:', error);
              return throwError(error); 
            })
          );
        } else {
          return throwError('User not authenticated');
        }
      })
    );
  }




  signOut(): Observable<any> {
    return from(this.afAuth.signOut()).pipe(
      catchError(error => {
        console.error('Error during sign-out:', error);
        return throwError(error); 
      })
    );
  }

  async currentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.uid || null;
  }

  async getCurrentUserId(): Promise<string | null> {
    return await this.currentUserId();
  }
}
