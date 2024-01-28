INSERT INTO departments (name)
select "new"
Where not exists (select name from departments where name = "new");


DELETE FROM departments
WHERE name = "cops";


INSERT INTO departments (name)
VALUES ("test");



`SELECT e.first_name, e.last_name, r.title, r.salary, d.name as dept, CONCAT(m.first_name,' ',m.last_name) as Manager
  from employees e 
  join roles r 
  ON e.role_id = r.id 
  join departments d 
  on r.department_id = d.id 
  join employees m
  ON e.manager_id = m.id;