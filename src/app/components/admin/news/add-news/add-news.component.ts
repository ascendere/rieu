import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { News } from '../../../../models/news.model';
import { NewsService } from '../../../../services/news.service';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'] 
})
export class AddNewsComponent implements OnInit {
  noticia: News = {
    title: '',
    content: '',
    autor: '',
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

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  removeImage() {
    this.selectedImageFile = null;
  }

  submitForm() {
    this.noticia.autor = 'Juan Alberto';
  
    if (this.noticia.title && this.noticia.content && this.noticia.date) {
      if (this.selectedImageFile) {
        this.newsService.addNews(this.noticia, this.selectedImageFile)
          .then(() => {
            console.log('Noticia agregada correctamente.');
            this.router.navigate(['/admin/news']);
          })
          .catch((error) => {
            console.error('Error al agregar la noticia:', error);
          });
      } else {
        console.error('Por favor, seleccione una imagen para la noticia.');
      }
    } else {
      console.error('Por favor, complete todos los campos obligatorios.');
    }
  }
}
