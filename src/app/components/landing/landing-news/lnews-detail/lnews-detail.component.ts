import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from '../../../../models/news.model';
import { NewsService } from '../../../../services/news.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface NewsWithFormattedDate extends News {
  formattedDate: string;
}
@Component({
  selector: 'app-lnews-detail',
  templateUrl: './lnews-detail.component.html',
  styleUrl: './lnews-detail.component.css'
})
export class LnewsDetailComponent {
  @Input() newsId: string | undefined;
  news: News | undefined;
  new: NewsWithFormattedDate | undefined;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

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

        this.new = { ...news, formattedDate } as NewsWithFormattedDate;
      }
    });
  }
}
