



select * from Addresses

select * from Flats

select * from UserFlat

select * from City

select * from Users


insert into Addresses values (1, 1, 1, '2020-01-01', '12', '47', null,  GETDATE(), 'Prank')

insert into Flats values (1, 24, 1, GETDATE(), 2, 'Flat free for all', null, GETDATE(), 2);


insert into UserFlat values (1, 1, GETDATE(), (select Flats.Id from Flats where FlatName = 'Flat free for all'), null, GETDATE(), 1);




--sql select flat by address?

-- po nazwie (adress street? czy nawet city)

--added 


--delete data from address table
delete UserFlat where UserFlat.Id =1;

delete Flats where Flats.Id = 1;

delete Addresses where Addresses.Id = 1;

select * from Addresses

select * from City


insert into City values (1, 1, GETDATE(), null, GETDATE(), 'Vancover');

insert into City values (1, 1, GETDATE(), null, GETDATE(), 'Valencia');


-- first select the city and later by selected city select avialable adresses
--here select vancover only city
select City.CityName from City where City.CityName = 'Vancover';


select c.CityName, a.Street, a.HouseNumber, a.FlatNumber from Addresses as a
join City as c on c.Id = a.CityId;



select * from City

select * from Addresses


update Addresses set Street = 'prank' where Street = 'Prank'

