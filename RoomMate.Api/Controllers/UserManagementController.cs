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
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("StachuLesiuProgramista@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokenOptions = new JwtSecurityToken(
                    claims: new List<Claim>(),
                    signingCredentials: signinCredentials
                );

                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) });
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
