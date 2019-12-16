using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RoomMate.Database.Models.Enums;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;

namespace RoomMate.Api.Controllers
{
    
    [Route("api/Dashboard")]
    public class DashboardController : Controller
    {
        private readonly IHouseworkService houseworkService;

        public DashboardController(IHouseworkService houseworkService)
        {
            this.houseworkService = houseworkService;
        }

        [Route("GetHouseWorkByFlatId")]
        [HttpGet]
        public IActionResult GetHouseWorkByFlatId(int flatId, WorkTypeEnum workType)
        {
            return this.Ok(this.houseworkService.GetHouseWorkListForFlat(flatId, workType));
        }

        [Route("AddHouseWork")]
        [HttpPost]
        public IActionResult AddHouseWork([FromBody]HouseWorkDto houseWorkDto)
        {
            ////TODO: How to get logged user 
            if (this.houseworkService.AddNewHouseWork(houseWorkDto))
            {
                return this.Ok(true);
            }

            return this.BadRequest();
        }
    }
}
