﻿using Microsoft.AspNetCore.Mvc;
using RoomMate.Domain.Services.Interfaces;

namespace RoomMate.Api.Controllers
{

    [Route("api/Flat")]
  //  [Authorize]   remove it for now
    public class FlatController : Controller
    {
        private readonly IFlatService _flatService;
        private readonly IAddressService _addressService;
        public FlatController(IFlatService flatService, IAddressService addressService)
        {
            this._flatService = flatService;
            this._addressService = addressService;
        }

        [HttpGet]
        [Route("GetCountOfAllFlats")]   
        public IActionResult GetCountOfAllFlats()
        {
            var count = _flatService.GetCountOfFlats();
            return this.Ok(count);
        }

        [HttpGet]
        [Route("GetFlatById")]
        public IActionResult GetFlatById(int id)
        {
            var flat = _flatService.GetFlatById(id);
            return this.Ok(flat);
        }

        [HttpGet]
        [Route("GetUserFlat")]
        public IActionResult GetUserFlat([FromBody]int id)
        {
            var userFlat = _flatService.GetUserFlat(id);
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




        [Route("GetCities")]
        [HttpGet]
        public IActionResult GetCitiesByName(string letters)
        {
            return this.Ok(this._addressService.GetCitiesByName(letters));
        }


        [Route("GetAddress")]
        [HttpGet]
        public IActionResult GetAddressByCityId(int id, string streetLetters)
        {
            return this.Ok(this._addressService.GetAddressByCityId(id, streetLetters));
        }

        [Route("GetFlat")]
        [HttpGet]
        public IActionResult GetAddressByFlatHouseNumb(string houseNumber, string flatNumber)
        {
            // mock for now
            return this.Ok(this._addressService.GetAddressByFlatHouseNumb(houseNumber, flatNumber));

        }
    }
}
