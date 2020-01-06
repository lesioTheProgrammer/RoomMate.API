using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RoomMate.Api.Controllers
{
    [Route("api/UserManagement")]
    public class UserManagementController : Controller
    {
        private readonly ILoginService loginService;
        private readonly IRegisterService registerService;
        private readonly ITokenService tokenService;

        public UserManagementController(
            ILoginService loginService, 
            IRegisterService registerService,
            ITokenService tokenService)
        {
            this.loginService = loginService;
            this.registerService = registerService;
            this.tokenService = tokenService;
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
    }
}
