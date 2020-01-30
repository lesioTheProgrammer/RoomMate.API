using Moq;
using RoomMate.Database.Models;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Implements;
using RoomMate.Repository;
using System;
using System.Collections.Generic;
using Xunit;

namespace RoomMate.Domain.Test.Services
{
    public class FlatServiceTest
    {
        Mock<IRepository<Flat>> flatRepository;
        Mock<IRepository<UserFlat>>  userFlatRepository;
        Mock<IRepository<User>> userRepository;
        Mock<IRepository<Address>> addressRepository;
        Mock<IRepository<City>> cityRepository;


        AddressService addressService;
        UserService userService;
        List<Flat> mockedObject;


        public FlatServiceTest()
        {
            this.flatRepository = new Mock<IRepository<Flat>>();
            this.userFlatRepository = new Mock<IRepository<UserFlat>>();
            this.userRepository = new Mock<IRepository<User>>();
            this.addressRepository = new Mock<IRepository<Address>>();
            this.cityRepository = new Mock<IRepository<City>>();


            this.mockedObject = new List<Flat>() { new Flat(){
                Active = true,
                Area = 50,
                CreatedBy= 1,
                CreatedDate = DateTime.Now,
                AddressId = null,
                FlatName = "Gwiaździsta",
                Id = 1,
                ModificatedBy = 1,
                ModificatedDate = DateTime.Now,
                RoomCount = 5,

            }
            };
        }

        [Fact]
        public void GetCountOfFlatsTest()
        {
            flatRepository.Setup(x => x.GetList(null)).Returns(this.mockedObject);
            addressService = new AddressService(addressRepository.Object, cityRepository.Object, flatRepository.Object, userFlatRepository.Object, userRepository.Object, userService);

            Assert.Equal(1, this.addressService.GetCountOfFlats());
        }
        [Fact]
        public void GetFlatByIdTest()
        {
            //// Any predicat - return object from list (TO REMEMBER!!!!!)
            flatRepository.Setup(x => x.GetFirst(It.IsAny<Func<Flat, bool>>())).Returns(this.mockedObject[0]);
            addressService = new AddressService(addressRepository.Object, cityRepository.Object, flatRepository.Object, userFlatRepository.Object, userRepository.Object, userService);
            Assert.IsType<AddressFlatDto>(addressService.GetFlatById(1));
        }
    }
}
