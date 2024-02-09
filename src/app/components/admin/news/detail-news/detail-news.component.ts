import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../../../models/news.model';
import { NewsService } from '../../../../services/news.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface NewsWithFormattedDate extends News {
  formattedDate: string;
}

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.css']
})
export class DetailNewsComponent {
  @Input() newsId: string | undefined;
  news: News | undefined;
  new: NewsWithFormattedDate | undefined;
  formattedContent: SafeHtml | undefined; 

  constructor(private newsService: NewsService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadNews(id);
      }
    });
  }

  loadNews(id: string): void {
    this.newsService.getNewsById(id).subscribe(news => {
      this.news = news;
      if (news) {
        const date = new Date(news.date);
        const formattedDate = format(date, "d 'de' MMMM  y", { locale: es });
        
        this.formattedContent = news.content ? this.sanitizer.bypassSecurityTrustHtml(news.content) : undefined;
        this.new = { ...news, formattedDate } as NewsWithFormattedDate;
      }
    });
  }
}
