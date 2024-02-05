import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  searchTerm: string = '';
  pageSize: number = 5; // Número de usuarios por página
  currentPage: number = 1; // Página actual

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadUsers();
  }

  openAddUserModal() {
    this.dialog.open(AddUserComponent, {
      width: '400px', 
    });
  }

  loadUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.userService.getUsers().subscribe((users) => {
      // Aplicar filtro si hay una búsqueda
      const filteredUsers = this.applySearchFilter(users);
      // Cortar la lista según la paginación
      this.users = filteredUsers.slice(startIndex, endIndex);
    });
  }

  deleteUser(userId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(userId).then(() => {
        this.loadUsers();
      });
    }
  }

  editUser(userId: string) {
    const userToEdit = this.users.find(user => user.id === userId);

    const dialogRef = this.dialog.open(AddUserComponent, {
        width: '400px',
        data: { selectedUserId: userId, user: userToEdit },  
    });

    dialogRef.afterClosed().subscribe(() => {
        this.loadUsers();
    });
  }

  applyFilter() {
    this.currentPage = 1;
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadUsers();
  }

  private applySearchFilter(users: User[]): User[] {
    const filterValue = this.searchTerm.trim().toLowerCase();
    return users.filter((user) =>
      user.name.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue)
    );
  }
}
