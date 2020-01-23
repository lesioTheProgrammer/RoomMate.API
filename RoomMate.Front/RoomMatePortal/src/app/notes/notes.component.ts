import { Component, OnInit } from "@angular/core";
import { NotesService } from "./notes.service";
import { NoteDto } from "./dto/note-dto";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit {
  flatId: number = 1;
  notesDto: Array<NoteDto>;
  newNoteDto: NoteDto = new NoteDto();
  noteAdded: boolean = null;
  constructor(public notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getNotes(this.flatId).subscribe(response => {
      this.notesDto = response;
    });
  }

  saveNote() {
    this.notesService.saveNote(this.newNoteDto).subscribe(response => {
      this.noteAdded = response;
      if (response === true) {
        this.notesDto.push(this.newNoteDto);
        this.newNoteDto = new NoteDto();
      }
    });
  }
}
