import { Injectable } from '@angular/core';
import { RequestHelperService } from '../request-helper/request-helper.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NoteDto } from './dto/note-dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends RequestHelperService {
  protected getApiRoute(): string {
    return "Notes"
  }

  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  public getNotes(flatId: number) : Observable<Array<NoteDto>>
  {
    return this.createGetRequestByParams("GetNotes", {flatId: flatId});
  }

  public saveNote(noteDto: NoteDto) : Observable<boolean>
  {
    return this.createPostRequest("SaveNote", noteDto);
  }
}
