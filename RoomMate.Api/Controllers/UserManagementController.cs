using Microsoft.AspNetCore.Mvc;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using System.Threading.Tasks;


namespace RoomMate.Api.Controllers
{
    [Route("api/UserManagement")]
    public class UserManagementController : Controller
    {
        private readonly ILoginService loginService;
        private readonly IRegisterService registerService;
        private readonly ITokenService tokenService;
        private readonly IUserService userService;

        public UserManagementController(
            ILoginService loginService, 
            IRegisterService registerService,
            ITokenService tokenService,
            IUserService userService)
        {
            this.loginService = loginService;
            this.registerService = registerService;
            this.tokenService = tokenService;
            this.userService = userService;
        }
        [Route("GetCities")]
        [HttpGet]
        public IActionResult GetCitiesByName(string letters)
        {
            return this.Ok(this.registerService.GetCitiesByName(letters));
        }


        [Route("GetAddress")]
        [HttpGet]
        public IActionResult GetAddressByCityId(int id, string streetLetters)
        {
            return this.Ok(this.registerService.GetAddressByCityId(id, streetLetters));
        }



        [Route("Register")]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterDto registerDto)
       {
            if (registerDto.IsValid() && registerService.RegisterUser(registerDto))
            {
                return this.Ok(true);
            }
            return this.Ok(false);
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginDto loginDto)
        {
            if (loginService.Login(loginDto.Login, loginDto.Password))
            {
                return Ok(this.tokenService.GenerateToken());
            }

            return this.Unauthorized();
        }


        public IActionResult ChangePassword()
        {
            return this.Ok();
        }

        public IActionResult UpdateUser()
        {
            return this.Ok();
        }

        [HttpGet]
        [Route("GetUserByFlatId")]
        public IActionResult GetUserByFlatId(int flatId)
        {
            return this.Ok(this.userService.GetUserByFlatId(flatId));
        }
    }
}
