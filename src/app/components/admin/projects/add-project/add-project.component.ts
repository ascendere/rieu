import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../models/project.model';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
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
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image', 'video'],
    ],
  };

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  toggleLabel(label: string) {
    const labelIndex = this.project.labels.indexOf(label);
    if (labelIndex !== -1) {
      this.project.labels.splice(labelIndex, 1);
    } else {
      this.project.labels.push(label);
    }
  }

  removeImage() {
    this.selectedImageFile = null;
  }

  submitForm() {

    this.project.autor = 'Juan Alberto';

    if (this.project.title && this.project.content && this.project.autor) {

      if (this.selectedImageFile) {
        this.projectService.addProject(this.project, this.selectedImageFile)
          .then(() => {
            console.log('Proyecto agregado correctamente.');
            
            // Redirige a la página deseada después de guardar el proyecto
            this.router.navigate(['/admin/projects']);
          })
          .catch((error) => {
            console.error('Error al agregar el proyecto:', error);
          });
      } else {
        console.error('Por favor, seleccione una imagen para el proyecto.');
      }
    } else {
      console.error('Por favor, complete todos los campos obligatorios.');
    }
  }}