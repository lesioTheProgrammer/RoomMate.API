using Microsoft.AspNetCore.Mvc;
using Moq;
using RoomMate.Api.Controllers;
using RoomMate.Domain.Dto;
using RoomMate.Domain.Services.Implements;
using RoomMate.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace RoomMate.Api.Test
{
    public class DashboardControllerTest
    {
        Mock<IHouseworkService> houseWorkServiceMock;

        public DashboardControllerTest()
        {
            houseWorkServiceMock = new Mock<IHouseworkService>();
        }

        [Fact]
        public void GetHouseWorkByFlatIdTest()
        {
            // Arrange
            var houseWorkList = new List<HouseWorkDto>
            {
                new HouseWorkDto()
                {
                    Active = true,
                    CreatedBy = 1,
                    CreatedDate = DateTime.Now,
                    Description = "opis",
                    FlatId = 1,
                    HouseWorkDate = DateTime.Now,
                    ModificatedBy = 1,
                    ModificatedDate = DateTime.Now,
                    Prices = 12,
                    UserId = 1,
                    WorkType = Database.Models.Enums.WorkTypeEnum.Shopping
                }
            };

            houseWorkServiceMock.Setup(x => x.GetHouseWorkListForFlat(1, Database.Models.Enums.WorkTypeEnum.Clean)).Returns(houseWorkList);
            DashboardController dashboardController = new DashboardController(houseWorkServiceMock.Object);

            var result = dashboardController.GetHouseWorkByFlatId(1,  Database.Models.Enums.WorkTypeEnum.Clean);
            var okObjectResult = result as OkObjectResult;
            Assert.NotNull(okObjectResult);

            var objectToCheck = okObjectResult.Value as IEnumerable<HouseWorkDto>;
            Assert.NotNull(objectToCheck);

            // Assert
            Assert.Equal(houseWorkList, objectToCheck);

        }

        [Fact]
        public void AddNewWorkhouseType()
        {
            // Arrange
            var newWorkhouse = new HouseWorkDto()
            {
                Active = true,
                CreatedBy = 1,
                CreatedDate = DateTime.Now,
                Description = "opis",
                FlatId = 1,
                HouseWorkDate = DateTime.Now,
                ModificatedBy = 1,
                ModificatedDate = DateTime.Now,
                UserId = 1,
                WorkType = Database.Models.Enums.WorkTypeEnum.Clean
            };

            // Act
            houseWorkServiceMock.Setup(x => x.AddNewHouseWork(newWorkhouse)).Returns(true);

            DashboardController dashboardController = new DashboardController(houseWorkServiceMock.Object);
            var createdResponse = dashboardController.AddHouseWork(newWorkhouse) as OkObjectResult;
            // Assert
            Assert.True(createdResponse.Value as bool?);
        }
    }
}
