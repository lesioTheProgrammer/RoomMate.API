using RoomMate.Domain.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface INoteService
    {

        List<NoteDto> GetNotes(int flatId);


        bool SaveNote(NoteDto noteDto);
    }
}
