import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(private http: HttpClient) { }

  getUsers = () => {
    return this.http.get
    ('https://jensjorisdecorte-backend-example-2.glitch.me/users');
   }

  getNotesForUser = (userName: string) => {
    return this.http.get
      ('https://jensjorisdecorte-backend-example-2.glitch.me/notes?name='
    + userName);
   }

  AddUser = (value: string) => {
    return this.http.post
      ('https://jensjorisdecorte-backend-example-2.glitch.me/users', {name: value });
  }

  DeleteUser = (name: string) => {
    return this.http.delete
      ('https://jensjorisdecorte-backend-example-2.glitch.me/remove?name=' + name);
  }

  AddNote = (name: string, contentValue: string) => {
    return this.http.post
      ('https://jensjorisdecorte-backend-example-2.glitch.me/addnote?name=' + name, {content: contentValue});
  }

  DeleteNote = (noteId: number) => {
    return this.http.delete
      ('https://jensjorisdecorte-backend-example-2.glitch.me/deletenote?id=' + noteId);
  }

  EditNote = (noteId: number, note: string) => {
    return this.http.put
      ('https://jensjorisdecorte-backend-example-2.glitch.me/editnote?id=' + noteId, {content: note});
  }

  EditCategory = (noteId: number, category: string) => {
    return this.http.put
      ('https://jensjorisdecorte-backend-example-2.glitch.me/editcategory?id='+ noteId, {content: category});
  }
}
