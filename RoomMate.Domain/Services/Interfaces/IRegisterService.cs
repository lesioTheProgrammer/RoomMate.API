using RoomMate.Domain.Dto;

namespace RoomMate.Domain.Services.Interfaces
{
    public interface IRegisterService
    {
        bool RegisterUser(RegisterDto dto);
        bool IsUserTaken(string login, string email);
    }
}
