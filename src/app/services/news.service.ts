import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { News } from '../models/news.model';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat/app'; 

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  getNews(): Observable<News[]> {
    return this.firestore.collection<News>('news').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as News;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  

  getNewsById(id: string): Observable<News | undefined> {
    return this.firestore.collection('news').doc(id).valueChanges().pipe(
      map((news: any) => {
        return { id, ...news } as News | undefined;
      })
    );
  }
  

  addNews(news: News, imageFile: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Subir la imagen al almacenamiento de Firebase
      const filePath = `/newsImages/${Date.now()}_${imageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, imageFile);

      // Manejar eventos de carga (opcional)
      uploadTask.snapshotChanges().subscribe(
        () => {},
        (error) => {
          console.error('Error al cargar la imagen:', error);
          reject(error);
        },
        () => {
          // Imagen cargada con éxito, obtener la URL de descarga
          fileRef.getDownloadURL().subscribe((url) => {
            // Agregar la noticia con la URL de la imagen
            const newsWithImageUrl: News = { ...news, image: url };
            this.firestore.collection('news').add(newsWithImageUrl).then(() => {
              resolve();
            }).catch((addError) => {
              console.error('Error al agregar la noticia con la URL de la imagen:', addError);
              reject(addError);
            });
          });
        }
      );
    });
  }
  

  updateNews(id: string, news: News): Promise<void> {
    return this.firestore.collection('news').doc(id).update(news);
  }

  updateNewsWithImage(id: string, news: News, newImageFile: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Subir la nueva imagen al almacenamiento de Firebase
      const filePath = `/newsImages/${Date.now()}_${newImageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, newImageFile);

      // Manejar eventos de carga (opcional)
      uploadTask.snapshotChanges().subscribe(
        () => {},
        (error) => {
          console.error('Error al cargar la nueva imagen:', error);
          reject(error);
        },
        () => {
          // Nueva imagen cargada con éxito, obtener la URL de descarga
          fileRef.getDownloadURL().subscribe((url) => {
            // Actualizar la noticia con la nueva URL de la imagen
            const updatedNews: News = { ...news, image: url };
            this.firestore.collection('news').doc(id).update(updatedNews).then(() => {
              resolve();
            }).catch((updateError) => {
              console.error('Error al actualizar la noticia con la nueva URL de la imagen:', updateError);
              reject(updateError);
            });
          });
        }
      );
    });
  }

  deleteNews(id: string): Promise<void> {
    return this.firestore.collection('news').doc(id).delete()
      .then(() => {
      })
      .catch((error) => {
        console.error('Error deleting news:', error);
        throw error;
      });
  }
}
