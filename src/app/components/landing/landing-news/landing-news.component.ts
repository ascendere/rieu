import { Component, OnInit } from '@angular/core';
import { News } from '../../../models/news.model';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-landing-news',
  templateUrl: './landing-news.component.html',
  styleUrls: ['./landing-news.component.css'],
})
export class LandingNewsComponent implements OnInit {
  recentNews: (News & { truncatedTitle: string })[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadRecentNews();
  }

  loadRecentNews(): void {
    this.newsService.getNews().subscribe((news) => {
      news.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      this.recentNews = news.slice(0, 3).map((newsItem) => ({
        ...newsItem,
        truncatedTitle: this.truncateTitle(newsItem.title, 10),
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
