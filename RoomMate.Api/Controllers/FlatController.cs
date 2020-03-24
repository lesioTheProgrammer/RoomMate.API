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
        private readonly IAddressService _addressService;
        public FlatController(IAddressService addressService)
        {
            this._addressService = addressService;
        }

        [HttpGet]
        [Route("GetCountOfAllFlats")]   
        public IActionResult GetCountOfAllFlats()
        {
            var count = _addressService.GetCountOfFlats();
            return this.Ok(count);
        }

        [HttpGet]
        [Route("GetFlatById")]
        public IActionResult GetFlatById(int id)
        {
            var flat = _addressService.GetFlatById(id);
            return this.Ok(flat);
        }

        [HttpGet]
        [Route("GetUserFlat")]
        public IActionResult GetUserFlat(string loggedUserName)
        {

            var userFlat = _addressService.GetUserFlat(loggedUserName);
            // return addresflatdto?
            return this.Ok(userFlat);
        }

        [HttpPost]
        [Route("AddNewFlat")]
        public IActionResult AddNewFlat([FromBody] AddressFlatDto addressFlatDto)
        {
            //TODO: Możliwość dodania nowego mieszkania
            if (addressFlatDto.IsValid())
            {
                return this.Ok(_addressService.AddNewFlat(addressFlatDto));
            }
            return this.Ok(new AddressFlatDto());
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
        public IActionResult RemoveFlat([FromBody]AddressFlatDto addressDto)
        {
            //TODO: Usunięcie - active na false
            if (addressDto.DoesFlatExist())
            {
                return this.Ok(this._addressService.RemoveFlat(addressDto));
            }
            return this.Ok(false);
        }


        [HttpPut]
        [Route("EditFlat")]
        public IActionResult EditFlat([FromBody]AddressFlatDto addressDto)
        {
            if (addressDto.DoesFlatExist())
            {
                return this.Ok(_addressService.EditFlat(addressDto));
            }
            return this.Ok(new AddressFlatDto());

        }


        [HttpPost]
        [Route("LeaveFlat")]
        public IActionResult LeaveFlat([FromBody]AddressFlatDto addressDto)
        {
            if (addressDto.DoesFlatExist())
            {
                return this.Ok(this._addressService.LeaveFlat(addressDto));
            }
            return this.Ok(false);
        }


        [HttpPost]
        [Route("AssignMateToFlat")]
        public IActionResult AssignMateToFlat([FromBody]AddressFlatDto addressDto)
        {
            if (addressDto.IsValid())
            {
                return this.Ok(this._addressService.AddFlatToUser(addressDto));
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
        public IActionResult GetAddressByFlatHouseNumb(AddressFlatDto addressDto)
        {
            if (addressDto.IsValid())
            {
              return this.Ok(this._addressService.GetAddressByFlatHouseNumb(addressDto));
            }
            return this.Ok(null);
        }
    }
}
