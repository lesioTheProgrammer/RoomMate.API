using RoomMate.Database.Models.Enums;

namespace RoomMate.Domain.Dto
{
    public class RegisterDto : BaseDto
    {
        public string Login { get; set; }
        
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Code { get; set; }

        public string PasswordSalt { get; set; }

        public  RoleTypeEnum RoleType { get; set; }

        public AddressDto AddressDto { get; set; }


        public bool IsValid()
        {

            return (ValidationDto.IsEmpty(this.Login) && ValidationDto.IsEmpty(this.Name) 
                && ValidationDto.IsEmpty(Surname)  && ValidationDto.IsValidPassword(this.Password)
                && ValidationDto.IsValidEmail(this.Email));
        }
    }
}
