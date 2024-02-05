import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../../models/project.model';
import { ProjectService } from '../../../../services/project.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ProjectWithFormattedDate extends Project {
  formattedDate: string;
}

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent {
  @Input() projectId: string | undefined;
  project: ProjectWithFormattedDate | undefined;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {}

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

        this.project = { ...project, formattedDate } as ProjectWithFormattedDate;
      }
    });
  }
  
}
