using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoomMate.Domain.Services.Interfaces;

namespace RoomMate.Api.Controllers
{
    
    [Route("api/Flat")]
    [Authorize]
    public class FlatController : Controller
    {
        private readonly IFlatService flatService;

        public FlatController(IFlatService flatService)
        {
            this.flatService = flatService;
        }

        [HttpGet]
        [Route("GetCountOfAllFlats")]   
        public IActionResult GetCountOfAllFlats()
        {
            var count = flatService.GetCountOfFlats();
            return this.Ok(count);
        }

        [HttpGet]
        [Route("GetFlatById")]
        public IActionResult GetFlatById(int id)
        {
            var flat = flatService.GetFlatById(id);
            return this.Ok(flat);
        }

        [HttpGet]
        [Route("GetUserFlat")]
        public IActionResult GetUserFlat([FromBody]int id)
        {
            var userFlat = flatService.GetUserFlat(id);
            return this.Ok(userFlat);
        }

        [HttpPost]
        [Route("AddNewFlat")]
        public IActionResult AddNewFlat()
        {
            //TODO: Możliwość dodania nowego mieszkania
            return this.Ok();
        }

        [HttpPut]
        [Route("ChangeFlat")]
        public IActionResult ChangeFlat()
        {
            //TODO: Możliwość edycji
            return this.Ok();
        }

        [HttpPut]
        [Route("RemoveFlat")]
        public IActionResult RemoveFlat()
        {
            //TODO: Usunięcie - active na false
            return this.Ok();
        }

        [HttpPost]
        [Route("AssignMateToFlat")]
        public IActionResult AssignMateToFlat()
        {
            //TODO: Przypisanie osoby do mieszkania
            return this.Ok();
        }
    }
}
