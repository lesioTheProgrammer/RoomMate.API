using System.Text.RegularExpressions;

namespace RoomMate.Domain.Dto
{
    public static  class ValidationDto
    {
        public static  bool IsValidEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }
            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(email);

            if (match.Success)
            {
                return true;
            }
            return false;
        }

        public static  bool IsValidPassword(string password)
        {
            if (string.IsNullOrEmpty(password) || password.Length <= 6)
            {
                return false;
            }
            return true;
        }

        public static  bool IsEmpty(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return false;
            }
            return true;
        }

        public static bool IsValidId(int? id)
        {
            if (id == 0 || id == null)
            {
                return false;
            }
            return true;
        }
    }
}
