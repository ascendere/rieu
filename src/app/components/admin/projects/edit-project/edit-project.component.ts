import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  project: Project = {
    title: '',
    content: '',
    autor: '',
    labels: [],
    date: new Date(),
  };

  selectedImageFile: File | null = null;

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
    ]
  };

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(id).subscribe((project) => {
        if (project) {
          this.project = project;
        } else {
          console.error('No se encontró el proyecto con el ID proporcionado.');
          this.router.navigate(['/admin/list-projects']);
        }
      });
    } else {
      console.error('No se proporcionó un ID para la edición del proyecto.');
      this.router.navigate(['/admin/list-projects']);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      this.project.image = ''; // Limpiar la URL de la imagen
    }
  }

  removeImage() {
    this.project.image = '';
    this.selectedImageFile = null;
  }

  toggleLabel(label: string): void {
    const index = this.project.labels.indexOf(label);
    if (index !== -1) {
      // Label exists, remove it
      this.project.labels.splice(index, 1);
    } else {
      // Label doesn't exist, add it
      this.project.labels.push(label);
    }
  }

  saveChanges(): void {
    if (this.selectedImageFile) {
      this.projectService.updateProjectWithImage(this.project.id!, this.project, this.selectedImageFile)
        .then(() => {
          console.log('Proyecto actualizado correctamente.');
          this.router.navigate(['/admin/list-projects']);
        })
        .catch((error) => {
          console.error('Error al actualizar el proyecto:', error);
        });
    } else {
      this.projectService.updateProject(this.project.id!, this.project)
        .then(() => {
          console.log('Proyecto actualizado correctamente.');
          this.router.navigate(['/admin/list-project']);
        })
        .catch((error) => {
          console.error('Error al actualizar el proyecto:', error);
        });
    }
  }
}
