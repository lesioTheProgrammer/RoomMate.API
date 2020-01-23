using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Services.Implements
{
    public class NoteService : INoteService
    {
        private readonly IRepository<Notes> _noteRepository;
        private readonly IRepository<User> _userRepository;

        public NoteService(IRepository<Notes> noteRepository, IRepository<User> userRepository)
        {
            this._noteRepository = noteRepository;
            this._userRepository = userRepository;
        }

      

        public List<NoteDto> GetNotes(int flatId)
        {
            List<NoteDto> notes = new List<NoteDto>();
            var notesFromFlat = this._noteRepository.GetList(x => x.FlatId == flatId);

            foreach (var item in notesFromFlat)
            {
                notes.Add(this.ConvertNoteToNoteDto(item));
            }

            return notes;
        }

        public bool SaveNote(NoteDto noteDto)
        {
            try
            {
                this._noteRepository.InsertOrUpdate(this.ConvertNoteDtoToNote(noteDto));
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private NoteDto ConvertNoteToNoteDto(Notes note)
        {
            return new NoteDto()
            {
                Active = true,
                Content = note.Content,
                CreatedBy = note.CreatedBy,
                CreatedDate = note.CreatedDate,
                FlatId = note.FlatId,
                Id = note.Id,
                ModificatedBy = note.ModificatedBy,
                ModificatedDate = note.ModificatedDate,
                UserId = note.UserId,
                UserName = this._userRepository.GetFirst(x=>x.Id == note.UserId)?.Login,
            };
        }


        private Notes ConvertNoteDtoToNote(NoteDto noteDto)
        {
            return new Notes()
            {
                Active = true,
                Content = noteDto.Content,
                CreatedBy = noteDto.CreatedBy,
                CreatedDate = DateTime.Now,
                FlatId = noteDto.FlatId,
             
                ModificatedBy = noteDto.ModificatedBy,
                ModificatedDate = DateTime.Now,
                UserId = noteDto.UserId
            };
        }

    }
}
