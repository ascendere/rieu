import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true; // Si el usuario está autenticado, permite el acceso a la ruta
        } else {
          // Si el usuario no está autenticado, redirige a la página de inicio de sesión
          return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
