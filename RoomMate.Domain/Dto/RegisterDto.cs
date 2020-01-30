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


        public AddressFlatDto AddressDto { get; set; }


        public bool IsValid()
        {
            return (IsEmpty(this.Login) && IsEmpty(this.Name)
                && IsEmpty(this.Surname)  && ValidationDto.IsValidPassword(this.Password)
                && ValidationDto.IsValidEmail(this.Email) && IsValidId(this.AddressDto.CityId));
        }
    }
}
