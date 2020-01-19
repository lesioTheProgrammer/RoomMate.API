using RoomMate.Domain.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface ITokenService
    {
        TokenDto GenerateToken();
    }
}
