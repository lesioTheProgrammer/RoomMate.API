using Microsoft.IdentityModel.Tokens;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RoomMate.Domain.Services.Implements
{
    public class TokenService : ITokenService
    {
        public TokenDto GenerateToken()
        {
            var secretKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.UTF8.GetBytes("StachuLesiuProgramista@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                claims: new List<Claim>(),
                signingCredentials: signinCredentials
            );

            return new TokenDto() { Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions) };
        }
    }
}
