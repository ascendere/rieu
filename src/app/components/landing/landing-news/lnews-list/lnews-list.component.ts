import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../services/news.service';
import { News } from '../../../../models/news.model';
import { Router } from '@angular/router';  // Asegúrate de importar Router
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lnews-list',
  templateUrl: './lnews-list.component.html',
  styleUrl: './lnews-list.component.css'
})
export class LnewsListComponent {
  newsList: News[] = [];

  constructor(private newsService: NewsService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadNews();
  }

  truncateContent(content: string, maxLength: number): any {
    if (content.length > maxLength) {
      const truncatedContent = content.substring(0, maxLength);
      const truncatedWithEllipsis = truncatedContent + (truncatedContent.endsWith(' ') ? '' : '...'); 
      return this.sanitizer.bypassSecurityTrustHtml(truncatedWithEllipsis);
    }
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }  
  
  

  loadNews(): void {
    this.newsService.getNews().subscribe(news => {
      this.newsList = news;
    });
  }

  editNews(id: string | undefined): void {
    console.log('ID de noticia:', id);
    if (id) {
      this.router.navigate(['/admin/edit-news', id]);
    }
  }
  
  deleteNews(id: string | undefined): void {
    if (id) {
      console.log('Intentando eliminar noticia con ID:', id);
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta noticia?');
  
      if (confirmDelete) {
        this.newsService.deleteNews(id).then(() => {
          console.log('Noticia eliminada exitosamente');
          this.loadNews();
        }).catch(error => {
          console.error('Error al eliminar la noticia:', error);
        });
      }
    }
  } 
}
