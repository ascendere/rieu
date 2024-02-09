import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  error: boolean = false;
  email: string = ''; 
  password: string = ''; 
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.signInWithEmail(email, password).subscribe(
        (user: User) => {
          this.redirectToDashboard(user);
        },
        (error) => {
          this.errorMessage = error.message;
          this.error = true;
        }
      );
    }
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe(
      (user: User) => {
        this.redirectToDashboard(user);
      },
      (error) => {
        this.errorMessage = error.message;
        this.error = true;
      }
    );
  }

  redirectToDashboard(user: User): void {
    if (user) {
      if (user.role === 'admin') {
        this.router.navigate(['/admin', user.id]); 
      } else if (user.role === 'editor') {
        this.router.navigate(['/editor', user.id]); 
      } else {
        this.router.navigate(['/']); // Otra ruta por defecto, si es necesario
      }
    }
  }
}
