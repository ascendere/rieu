import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  @Input() showSaveButton: boolean = true;
  @Output() userSaved = new EventEmitter<void>();
  selectedUserId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // Inject the data
  ) {}

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });

    if (this.data.selectedUserId) {
      this.selectedUserId = this.data.selectedUserId;  // Assign the selectedUserId
      const user = this.data.user;  // Get user data from the injected data
      this.addUserForm.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const userToSave = { ...this.addUserForm.value };
  
      if (this.selectedUserId !== null) {
        // Si se está editando, actualiza el usuario existente
        userToSave.id = this.selectedUserId;
        this.userService.updateUser(userToSave).then(() => {
          this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close();  // Cierra el modal después de guardar
          this.userSaved.emit();
        }).catch((error) => {
          this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
            duration: 3000,
          });
        });
      } else {
        // Si no se está editando, crea un nuevo usuario
        this.userService.createUser(userToSave).then(() => {
          this.snackBar.open('Usuario creado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close();  // Cierra el modal después de guardar
          this.userSaved.emit();
        }).catch((error) => {
          this.snackBar.open('Error al crear el usuario', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    }
  }  
}
