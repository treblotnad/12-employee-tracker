INSERT INTO departments (name)
select "new"
Where not exists (select name from departments where name = "new");


DELETE FROM departments
WHERE name = "cops";


INSERT INTO departments (name)
VALUES ("test");