using RoomMate.Database.Models;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;


namespace RoomMate.Domain.Services.Implements
{
    public class LoginService: ILoginService
    {
        private readonly IRepository<User> userRepository;

        public LoginService(IRepository<User> userRepository)
        {
            this.userRepository = userRepository;
        }

        public bool Login(string userName, string password)
        {
            bool isLogged = false;
            //check if pass or username are not null{
            if (!string.IsNullOrEmpty(userName) || !string.IsNullOrEmpty(password))
            {
                var user = this.userRepository.GetFirst(x => x.Login.ToLower() == userName.ToLower() && x.Active == true);
                //check the password only if user exsists (time saving)
                if (user != null)
                {
                    var crypto = new SimpleCrypto.PBKDF2();
                    string passwordToCheck = crypto.Compute(password, user.PasswordSalt);  //entered password and salt drom db
                    isLogged = crypto.Compare(user.Password, passwordToCheck);  // T of F 
                }
            }
            
            return isLogged;
        }
    }
}
