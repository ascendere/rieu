import { Component, OnInit } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';


@Component({
  selector: 'app-landing-projects',
  templateUrl: './landing-projects.component.html',
  styleUrls: ['./landing-projects.component.css']
})
export class LandingProjectsComponent implements OnInit {
  recentProjects: (Project & { truncatedTitle: string })[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadRecentProjects();
  }

  loadRecentProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.recentProjects = projects.slice(0, 6).map(project => ({
        ...project,
        truncatedTitle: this.truncateTitle(project.title, 7)
      }));
    });
  }

  truncateTitle(title: string, maxWords: number): string {
    const words = title.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return title;
  }
}
