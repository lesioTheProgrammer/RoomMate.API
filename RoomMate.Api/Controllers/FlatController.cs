using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;

namespace RoomMate.Api.Controllers
{

    [Route("api/Flat")]
    [Authorize]  
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
        public IActionResult AssignMateToFlat([FromBody]AddressDto addressDto)
        {
            // get currently logged user
            if (addressDto.IsValid())
            {
                return this.Ok(this._flatService.AddFlatToUser(addressDto));
            }
            return this.Ok(false);

        }


        [Route("GetCities")]
        [HttpGet]
        public IActionResult GetCitiesByName(string letters)
        {
            return this.Ok(this._addressService.GetCitiesByName(letters));
        }


        [Route("GetStreet")]
        [HttpGet]
        public IActionResult GetStreetsByLettersCityID(int id, string streetLetters)
        {
            return this.Ok(this._addressService.GetStreetsDistincted(id, streetLetters));
        }

        [Route("GetFlat")]
        [HttpGet]
        public IActionResult GetAddressByFlatHouseNumb(AddressDto addressDto)
        {
            if (addressDto.IsValid())
            {
              return this.Ok(this._addressService.GetAddressByFlatHouseNumb(addressDto));
            }
            return this.Ok(null);
        }
    }
}
