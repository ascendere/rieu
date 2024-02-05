import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-lprojects-list',
  templateUrl: './lprojects-list.component.html',
  styleUrl: './lprojects-list.component.css'
})
export class LprojectsListComponent {
  projectList: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  truncateContent(content: string, maxLength: number): any {
    if (content.length > maxLength) {
      const truncatedContent = content.substring(0, maxLength);
      const truncatedWithEllipsis = truncatedContent + (truncatedContent.endsWith(' ') ? '' : '...'); 
      return this.sanitizer.bypassSecurityTrustHtml(truncatedWithEllipsis);
    }
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projectList = projects;
    });
  }

  editProject(id: string | undefined): void {
    console.log('ID de proyecto:', id);
    if (id) {
      this.router.navigate(['/admin/edit-project', id]);
    }
  }

  deleteProject(id: string | undefined): void {
    if (id) {
      console.log('Intentando eliminar proyecto con ID:', id);
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este proyecto?');

      if (confirmDelete) {
        this.projectService.deleteProject(id).then(() => {
          console.log('Proyecto eliminado exitosamente');
          this.loadProjects();
        }).catch(error => {
          console.error('Error al eliminar el proyecto:', error);
        });
      }
    }
  }

  truncateTitle(title: string, maxWords: number): string {
    const words = title.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return title;
  }
}

