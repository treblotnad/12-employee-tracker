iNSERT INTO departments (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Manufacturing"),
       ("Lab"),
       ("Support");
       
iNSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson",100000,1)
       ,("Business Manager",135000,1)
       ,("Marketer",110000,2)
       ,("Global Marketer",140000,2)
       ,("Operator",50000,3)
       ,("Mfg Engineer",120000,3)
       ,("Prod Dev Engineer", 150000,4)
       ,("Chemist",165000,4)
       ,("Lab Manager",180000,4)
       ,("Team Lead",90000,5)
       ,("Facility Coord",85000,5);

iNSERT INTO employees (first_name,last_name,role_id)
VALUES ("Mike","B",1)
,( "Dan","M",2)
,( "Windy","SC",3)
,("Carolina","D",4)
,("Doug","B",5)
,("Matt","M",6)
,("Dan","T",7)
,("Keith","L",8)
,("Claire","J",9)
,("Sam","R",10)
,("Krystal","S",11)
       ;
