using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RoomMate.Api.Controllers
{
    [Route("api/UserManagement")]
    public class UserManagementController : Controller
    {
        private readonly ILoginService loginService;
        private readonly IRegisterService registerService;

        public UserManagementController(ILoginService loginService, IRegisterService registerService)
        {
            this.loginService = loginService;
            this.registerService = registerService;

        }


        //sam post wystarczy
        //get w angularze formatka i elo
        [Route("Register")]
        [HttpPost]
        public IActionResult Register([FromBody]RegisterDto registerDto)
        {
            if (registerService.RegisterUser(registerDto) && registerDto.IsValid())
            {
                return this.Ok();
            }
            return this.BadRequest();
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginDto loginDto)
        {
            if (loginService.Login(loginDto.Login, loginDto.Password))
            {
                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.
                AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);

                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, loginDto.Login));
                identity.AddClaim(new Claim(ClaimTypes.Name, loginDto.Login));

                var principal = new ClaimsPrincipal(identity);

                var props = new AuthenticationProperties
                {
                    AllowRefresh = true,
                    ExpiresUtc = DateTimeOffset.Now.AddDays(1),
                    IsPersistent = true
                };




                await HttpContext.SignInAsync(
             CookieAuthenticationDefaults.
                             AuthenticationScheme, principal, props);

                return this.Ok(true);
            }
            return this.BadRequest();
        }


        public IActionResult ChangePassword()
        {
            return this.Ok();
        }

        public IActionResult UpdateUser()
        {
            return this.Ok();
        }
    }
}
