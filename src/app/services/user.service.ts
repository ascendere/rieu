import { Injectable } from '@angular/core';

import { User } from './../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { finalize, map, tap } from 'rxjs/operators';
import { Observable, filter, forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  getUser(uid: string): Observable<User> {
    return this.firestore.doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(
        map(user => user ? user : {
          id: '',
          name: '',
          email: '',
          role: '',
        })
      );
  }

  getPaginatedUsers(page: number, pageSize: number): Observable<User[]> {
    const startAt = (page - 1) * pageSize;

    return this.firestore
      .collection<User>('users', (ref) =>
        ref.orderBy('name').startAt(startAt).limit(pageSize)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { ...data, id };
          })
        )
      );
  }
  
  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { ...data, id };
        }))
      );
  }

  getUserRole(uid: string): Observable<string | null> {
    return this.firestore.doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(
        tap(user => console.log(user)),
        map(user => user ? user.role : null)
      );
  }

  setUserData(user: User, uid: string) {
    const userRef = this.firestore.doc(`users/${uid}`);
    const userData: Omit<User, 'id'> = {
      email: user.email,
      name: user.name,
      role: user.role,
    }
    return userRef.set(userData, {
      merge: true
    });
  }


  createUser(user: User) {
    const tempPassword = Math.random().toString(36).slice(-8);

    return this.auth.createUserWithEmailAndPassword(user.email, tempPassword).then((result) => {
      if (result.user) {
        this.auth.sendPasswordResetEmail(user.email);
        this.setUserData(user, result.user.uid);
      }
    });
  }


  updateUser(user: User) {
    return this.firestore.firestore.runTransaction(transaction => {
      const userRef = this.firestore.doc(`users/${user.id}`).ref;
      return transaction.get(userRef).then(userDoc => {
        if (!userDoc.exists) {
          throw new Error('User does not exist!');
        }
        transaction.update(userRef, user);
      });
    });
  }


  deleteUser(userId: string) {
    return this.firestore.firestore.runTransaction(transaction => {
      const userRef = this.firestore.doc(`users/${userId}`).ref;
      return transaction.get(userRef).then(userDoc => {
        if (!userDoc.exists) {
          throw new Error('User does not exist!');
        }
        transaction.delete(userRef);
      });
    });
  }
sendVerificationMail() {
    return this.auth.currentUser.then(u => u?.sendEmailVerification())
    .then(() => {
    })
  }

  forgotPassword(passwordResetEmail: string) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }


}
