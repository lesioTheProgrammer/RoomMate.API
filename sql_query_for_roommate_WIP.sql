



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



select * from City--id

select * from Addresses --cityID

select * from Flats  --addID



select * from UserFlat --flatid i userId

select * from Users --nic


-- if address exist theres also flat to this addres 1:1
--there can be user without flat? yes for a while but later I cant allow that - thats why there will be obligatory redirect to addr page 

--1. only city in form: insert into users values from form and into addres - cityId
--2. city and addres in form: insert into users values from form and 



insert into Flats values (1, 25, 1, GETDATE(), 3, 'Gerar this is my flat', null, GETDATE(), 1);

--test selects - last from just inserted
select * from Users






--nested select tio get city flat user flat etc

select c.CityName, a.Street, f.FlatName, u.Email from City as c
left join Addresses as a on a.CityId = c.Id
left join Flats as f on f.AddressId = a.Id
left join UserFlat as uf on uf.FlatId = f.id
left join Users as u on u.Id = uf.UserId
where u.Id = (select top 1Id from Users order by Id desc);

