using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RoomMate.Api.Controllers
{
    [Route("api/Notes")]
    [Authorize]
    public class NotesController : Controller
    {
        private readonly INoteService _noteService;

        public NotesController(INoteService noteService)
        {
            this._noteService = noteService;
        }

        [HttpGet]
        [Route("GetNotes")]
        public IActionResult GetNotes(int flatId)
        {
            return Ok(this._noteService.GetNotes(flatId));
        }


        [HttpPost]
        [Route("SaveNote")]
        public IActionResult GetNotes([FromBody]NoteDto noteDto)
        {
            return this.Ok(this._noteService.SaveNote(noteDto));
        }
    }
}
