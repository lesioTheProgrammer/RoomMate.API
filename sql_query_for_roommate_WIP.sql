
use RoomMate



select * from Addresses

select * from Flats

select * from UserFlats

select * from City

select * from Users


insert into Addresses values (1, 1, 1, '2020-01-01', '133', '47', null,  GETDATE(), 'Pradzynskiego')

insert into Flats values (1, 24, 1, GETDATE(), 2, 'Flat free for all', null, GETDATE(), 2);


insert into UserFlats values (1, 1, GETDATE(), (select Flats.Id from Flats where FlatName = 'Flat free for all'), null, GETDATE(), 1);


delete City from City where City.Id >=3;


--sql select flat by address?

-- po nazwie (adress street? czy nawet city)

--added 


--delete data from address table
delete UserFlats where UserFlats.Id =1;

delete Flats where Flats.Id = 1;

delete Addresses where Addresses.Id = 1;

select * from Addresses

select * from City


insert into City values (1, 1, GETDATE(), null, GETDATE(), 'Vancover');

insert into City values (1, 1, GETDATE(), null, GETDATE(), 'Germania');


-- first select the city and later by selected city select avialable adresses
--here select vancover only city
select City.CityName from City where City.CityName = 'Vancover';


select c.CityName, a.Street, a.HouseNumber, a.FlatNumber from Addresses as a
join City as c on c.Id = a.CityId;



select * from City--id

select * from Addresses --cityID

select * from Flats  --addID



select * from UserFlats --flatid i userId

select * from Users --nic


-- if address exist theres also flat to this addres 1:1
--there can be user without flat? yes for a while but later I cant allow that - thats why there will be obligatory redirect to addr page 

--1. only city in form: insert into users values from form and into addres - cityId
--2. city and addres in form: insert into users values from form and 



insert into Flats values (1, 25, 1, GETDATE(), 1002, 'Flat', null, GETDATE(), 1);

--test selects - last from just inserted
select * from Users






--nested select tio get city flat user flat etc

select c.CityName, a.Street, f.FlatName, u.Email from City as c
left join Addresses as a on a.CityId = c.Id
left join Flats as f on f.AddressId = a.Id
left join UserFlats as uf on uf.FlatId = f.id
left join Users as u on u.Id = uf.UserId
where u.Id = (select top 1Id from Users order by Id desc);



select * from Users

select * from City


select a.Id, a.FlatNumber, a.HouseNumber from Addresses as a;
select f.AddressId, f.FlatName, f.Id from Flats as f;
select uf.FlatId, uf.UserId from UserFlats as uf






delete UserFlats from UserFlats as uf where uf.FlatId = 5

update Addresses set FlatNumber = '3' where Addresses.Id = 3;

select uf.FlatId, uf.UserId from UserFlats as uf




--- inserty do UF user as matie
--- logged user id to 41 // updated 24.03



select * from Flats where Flats.FlatName = 'Kurt Ville';

insert into UserFlats (FlatId, UserId, Active, CreatedDate, ModificatedDate, RoleType)  
values (1020, 41, 1, GETDATE(), GETDATE(), 0)


select * from UserFlats as uf where FlatId = 1087;

update UserFlats set RoleType = 1 where Id = 1242;

select * from Flats

select * from UserFlats




select * from Users
select * from Addresses


select * from City


delete UserFlats from UserFlats where UserFlats.Id = 1017;


--address first
--flat later
--userflats with user role admin


delete Flats from Flats where Flats.FlatName = 'ww';


-- houswork

select * from Houseworks

select * from WorkPrices

select * from WorkType

select wp.Prices from WorkPrices as wp 
left join Houseworks as hw on
wp.Id = hw.WorkPriceId

-- query to update prices depending on hw
-- have to check if hw has appropierate id first
update WorkPrices set Prices = 1100 where WorkPrices.Id = (select hw.WorkPriceId  from Houseworks as hw where hw.Id = 14)


select a.Street, f.Id from Flats as f 
left join Addresses as a on a.Id = f.AddressId
where a.Street = 'Kurt';
-- fid = 1087


insert into Houseworks (Active, CreatedBy, CreatedDate, Description, FlatId, HouseWorkDate,
ModificatedBy, ModificatedDate, UserId, WorkPriceId, WorkType) values (1, null, GETDATE(), 'Dodane extra', 1087, GETDATE(), null, GETDATE(), 40, null, 1);

select * from Houseworks

delete Houseworks from Houseworks where Houseworks.Id > 8;


CURRENT_TIMESTAMP  

