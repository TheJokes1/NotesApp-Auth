import { Component } from '@angular/core';
import { APIService } from './api.service';
import { Note } from './note';
import { MatDialog } from '@angular/material/dialog';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';
import { Categories } from './Categories'

export interface DialogData {
  category: string;
}

interface User{
  name: String;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'NotesApp';
  usersList: User[] = [];
  notes: Note[] = [];
  user: any;
  newUser: string;
  public makeNote : boolean;
  messageAddUser: any;
  errorMessage: string;
  messageObject: any;
  currentUser: any;
  newNote: string;
  isEditNote: boolean = false;
  currentNote: Note;
  note: string;
  category: string;
  searchString: string;
  allNotes: any;
  selectedCategory: string;
  categories: any = Categories.categories;
  lastNoteId: any;
  nieuweNote: Note;
  currentUserId: number;


  constructor(public apiService: APIService, public dialog: MatDialog) {
      apiService.getUsers().subscribe((data: User[]) =>{
        console.log(data);
        this.usersList = data;
      });
      this.makeNote=false;
  }

  filterLongList(event: any){
    console.log("Filteraction: ", event);
    if (this.selectedCategory != undefined){
      this.notes = this.allNotes.filter(item => {
          return ((item.content.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1)
            && (item.category == this.selectedCategory));
      });
    } else {
        this.notes = this.allNotes.filter(item => {
          return item.content.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1;
        });
      }
    if (this.searchString=="" && this.selectedCategory== undefined) this.GetNotes(this.currentUser);
  }

  RemoveCatFilter(){
    this.selectedCategory = undefined;
    this.GetNotes(this.currentUser);
  }

  GetNotes(userName){
    console.log(userName);
    this.searchString="";
    this.selectedCategory = undefined;
    if (userName != "undefined"){
      this.apiService.getNotesForUser(userName).subscribe((data: Note[]) => {
        this.notes= data;
      console.log(this.notes);
      this.currentUser= userName;
      if (this.currentUserId) this.currentUserId= data[0].userId;
      this.allNotes = this.notes;
      });
    }else{
      this.DisplayMessage("Geef een naam in");
    }
  }

  AddNote(currentUser: string, newNote: string){
    if (newNote){
      if (!this.isEditNote){ // SAVE NEW NOTE !!
        this.apiService.AddNote(this.currentUser, this.newNote)
          .subscribe((response: any) => {
            this.makeNote=true;
            this.GetNotes(currentUser);
            this.newNote=""; // empty the textarea
            //make note to pass to the MODAL
            this.nieuweNote = {id: +response.success,
              content: this.newNote,
              userId: this.currentUserId,
              category: "..."}
            this.openDialog(this.nieuweNote);
        });
      }else{ // SAVE EDITED NOTE !!
        this.apiService.EditNote(this.currentNote.id, this.newNote).subscribe((response: any) => {
          console.log(response);
            this.GetNotes(currentUser);
            this.isEditNote= false;
            this.newNote= "";
          });
      }
    }
  }

  DeleteNote(note: Note){
    console.log(note);
    this.apiService.DeleteNote(note.id).subscribe((response: any) => {
      console.log(response);
      this.GetNotes(this.currentUser);
    });
  }

  EditNote(note :Note){
    this.isEditNote= true;
    this.newNote= note.content;
    this.currentNote= note;
  }

  AddUser(userName){
    if (userName){
      this.apiService.AddUser(this.newUser).subscribe((response: any) => {
        console.log(response);
        this.messageAddUser = JSON.stringify(response);
        this.errorMessage = response.message;
        console.log(this.errorMessage);
        this.apiService.getUsers().subscribe((data: User []) =>{
          this.usersList= data;
        })
        if (this.errorMessage) this.DisplayMessage(this.errorMessage);
        this.newUser="";
        this.currentUser=this.newUser;
        this.GetNotes(userName);
      })
    } else{
      this.DisplayMessage("Geef een naam in");
    }
  }

  DeleteUser(userName: string){
    if (this.ConfirmAction("Ben je zeker dat je " + userName+ " wil verwijderen?")){
      if (userName) {
        this.apiService.DeleteUser(userName).subscribe((response: any) => {
            this.user=response;
            console.log(this.user);
            this.apiService.getUsers().subscribe((data: User []) =>{
              this.usersList= data;
            })
            console.log(response.success);
            if (response.success) this.DisplayMessage(response.success)
            else{
              window.alert(response.error)
            };
          })
      }
      if (this.currentUser == userName){
        this.currentUser="";
        this.notes=null;
      }
    }
  }

  EditCategory(note: Note, category: string){
    console.log (note.id, category)
    this.apiService.EditCategory(note.id, category).subscribe((response: any) => {
      console.log(response);
      this.GetNotes(this.currentUser);
    });
  }

  openDialog(note: Note): void {
      const dia= this.dialog.open(ExampleDialogComponent, {
        data: { category: note.category }
        });
      dia.afterClosed().subscribe(result =>{
        this.category = result;
        console.log("result in app component: ", this.category);
        this.EditCategory(note, this.category);
      })
    }

  ConfirmAction(message){
    var r = confirm(message);
    return r;
  }

  DisplayMessage(message){
    window.alert(message);
  }

}

