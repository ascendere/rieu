import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';  
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private dialog: MatDialog) {}  

  openAddUserModal() {
    this.dialog.open(AddUserComponent, {
      width: '400px', 
    });
  }
}
