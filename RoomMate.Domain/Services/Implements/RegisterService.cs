using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;

namespace RoomMate.Domain.Services.Implements
{

    public class RegisterService : IRegisterService
    {
        private readonly IRepository<User> _userRepository;


        public RegisterService(IRepository<User> userRepository)
        {
            this._userRepository = userRepository;
        }



        public bool RegisterUser(RegisterDto registerDto)
        {

            //tu mielonka dto przekazuje z register dto i potem wale tym do repo?
            //w repo jeszcze robie czysty obiekt do inserta do tabeli

            bool isRegistered = false;
            //crypting password
            var crypto = new SimpleCrypto.PBKDF2();
            var encrpPass = crypto.Compute(password); //pass
            var salt = crypto.Salt; //salt

            //check unique values of login and email





            //add user to db
            try
            {
                var user = this.ConvertToTarget(registerDto);
                this._userRepository.InsertOrUpdate(user);
            }
            catch (Exception ex)
            {
                return false;
            }




            return isRegistered;
        }



        public bool CheckAvialabilityOfLoginEmail(string login, string email)
        {
            bool taken = true;

            var user = _userRepository.GetFirst(x => x.Login == login || x.Email == email);

            if (user != null)
            {
                taken = false;
            }
            return taken;
        }



        public User ConvertToTarget(RegisterDto registerDto)
        {

            //add missing parts of user

            return new User
            {
                Active = true,
                //add more fields here 

            };
        }


    }
}
