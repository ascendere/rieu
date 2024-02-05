import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    of(null).pipe(delay(7000)).subscribe(() => {
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signIn(email, password)
        .subscribe(
          () => {
            // El servicio debería manejar la redirección después del inicio de sesión
          },
          error => {
            this.loginError = 'Credenciales incorrectas. Verifica tu correo y contraseña.';
            console.error('Error durante el inicio de sesión:', error);
          }
        );
    } else {
      this.loginError = 'Por favor, completa ambos campos correctamente.';
    }
  }
}
