DROP DATABASE IF EXISTS staff;
CREATE DATABASE staff;

Use staff;

CREATE TABLE departments(
    id INT NOT NULL AUTO_increment Primary Key
    , name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_increment Primary Key
    , title VARCHAR(30) NOT NULL
    , salary DECIMAL(15,2) NOT NULL
    , department_id INT NOT NULL
    , foreign key (department_id)
    references departments(id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_increment Primary Key
    , first_name VARCHAR(30) NOT NULL
    , last_name VARCHAR(30) NOT NULL
    , role_id INT NOT NULL
    , manager_id INT
    , foreign key (role_id) references roles(id)

)