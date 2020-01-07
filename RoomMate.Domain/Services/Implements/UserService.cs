using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Interfaces;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RoomMate.Domain.Services.Implements
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> userRepository;
        private readonly IRepository<UserFlat> userFlatRepository;

        public UserService(IRepository<User> userRepository, IRepository<UserFlat> userFlatRepository)
        {
            this.userRepository = userRepository;
            this.userFlatRepository = userFlatRepository;
        }

        public List<UserListDto> GetUserByFlatId(int flatId)
        {
            List<UserListDto> userListDtos = new List<UserListDto>();
            var userInFlats = this.userFlatRepository.GetList(x => x.Active == true && x.FlatId == flatId).Select(x => x.UserId).ToList();

            if (userInFlats.Any())
            {
                var userList = this.userRepository.GetList(x => x.Active == true && userInFlats.Contains(x.Id)).ToList();

                foreach (var user in userList)
                {
                    userListDtos.Add(ConverterToDto(user));
                }
            }

            return userListDtos;
        }

        public UserListDto ConverterToDto(User user)
        {
            return new UserListDto()
            {
                Name = user.Name,
                Surname = user.Surname,
                Login = user.Login,
                UserId = user.Id
            };
        }
    }
}
