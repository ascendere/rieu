import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../models/project.model';
import { ProjectService } from '../../../../services/project.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';


interface ProjectWithFormattedDate extends Project {
  formattedDate: string;
}
@Component({
  selector: 'app-lproject-detail',
  templateUrl: './lproject-detail.component.html',
  styleUrl: './lproject-detail.component.css'
})
export class LprojectDetailComponent {
  @Input() projectId: string | undefined;
  project: ProjectWithFormattedDate | undefined;
  formattedContent: SafeHtml | undefined; 

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProject(id);
      }
    });
  }

  loadProject(id: string): void {
    this.projectService.getProjectById(id).subscribe(project => {
      if (project) {
        const date = new Date(project.date);
        const formattedDate = format(date, "d 'de' MMMM  y", { locale: es });
    
        this.formattedContent = project.content ? this.sanitizer.bypassSecurityTrustHtml(project.content) : undefined;
    
        this.project = { ...project, formattedDate } as ProjectWithFormattedDate;
      }
    });
  }
}
