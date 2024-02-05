import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Project } from '../models/project.model';
import { Observable, map } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  getProjects(): Observable<Project[]> {
    return this.firestore.collection<Project>('projects').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return this.firestore.collection('projects').doc(id).valueChanges().pipe(
      map((project: any) => {
        return { id, ...project } as Project | undefined;
      })
    );
  }


  addProject(project: Project, imageFile: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const filePath = `/projectImages/${Date.now()}_${imageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, imageFile);

      uploadTask.snapshotChanges().subscribe(
        () => {},
        (error) => {
          console.error('Error al cargar la imagen:', error);
          reject(error);
        },
        () => {
          fileRef.getDownloadURL().subscribe((url) => {
            const projectWithImageUrl: Project = { ...project, image: url };
            this.firestore.collection('projects').add(projectWithImageUrl).then(() => {
              resolve();
            }).catch((addError) => {
              console.error('Error al agregar el proyecto con la URL de la imagen:', addError);
              reject(addError);
            });
          });
        }
      );
    });
  }

  updateProject(id: string, project: Project): Promise<void> {
    return this.firestore.collection('projects').doc(id).update(project);
  }

  updateProjectWithImage(id: string, project: Project, newImageFile: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const filePath = `/projectImages/${Date.now()}_${newImageFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, newImageFile);

      uploadTask.snapshotChanges().subscribe(
        () => {},
        (error) => {
          console.error('Error al cargar la nueva imagen:', error);
          reject(error);
        },
        () => {
          fileRef.getDownloadURL().subscribe((url) => {
            const updatedProject: Project = { ...project, image: url };
            this.firestore.collection('projects').doc(id).update(updatedProject).then(() => {
              resolve();
            }).catch((updateError) => {
              console.error('Error al actualizar el proyecto con la nueva URL de la imagen:', updateError);
              reject(updateError);
            });
          });
        }
      );
    });
  }

  deleteProject(id: string): Promise<void> {
    return this.firestore.collection('projects').doc(id).delete()
      .then(() => {
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
        throw error;
      });
  }
}
