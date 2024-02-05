import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../../services/news.service';
import { News } from '../../../../models/news.model';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css'],
})
export class EditNewsComponent implements OnInit {
  news: News = {
    title: '',
    content: '',
    image: '',
    autor: '',
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
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newsService.getNewsById(id).subscribe((news) => {
        if (news) {
          this.news = news;
        } else {
          // Manejo de caso en el que no se encuentra la noticia con el ID proporcionado
          console.error('No se encontró la noticia con el ID proporcionado.');
          // Puedes redirigir a la lista de noticias u otra página según tus necesidades
          this.router.navigate(['/list-news']);
        }
      });
    } else {
      // Manejo de caso en el que no se proporciona un ID
      console.error('No se proporcionó un ID para la edición de la noticia.');
      // Puedes redirigir a la lista de noticias u otra página según tus necesidades
      this.router.navigate(['/list-news']);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      this.news.image = ''; // Limpiar la URL de la imagen
    }
  }

  removeImage() {
    this.news.image = '';
    this.selectedImageFile = null;
  }

  saveChanges(): void {
    if (this.selectedImageFile) {
      this.newsService.updateNewsWithImage(this.news.id!, this.news, this.selectedImageFile)
        .then(() => {
          console.log('Noticia actualizada correctamente.');
          this.router.navigate(['/admin/list-news']);
        })
        .catch((error) => {
          console.error('Error al actualizar la noticia:', error);
        });
    } else {
      this.newsService.updateNews(this.news.id!, this.news)
        .then(() => {
          console.log('Noticia actualizada correctamente.');
          this.router.navigate(['/admin/list-news']);
        })
        .catch((error) => {
          console.error('Error al actualizar la noticia:', error);
        });
    }
  }
}
