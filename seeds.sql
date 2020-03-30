USE employee_db;

INSERT INTO department (name) 
VALUE 
('Sales')
, ('Engineering')
, ('Finace')
, ('Legal');

INSERT INTO role (title,salary, department_id)
VALUE 
('Sales lead', '50000','1')
, ('Salesperson', '80000', '1')
, ('Lead Engineering', '12000', '2')
, ('lawyer', '20000', '4')
,('Accountant', '123000', '3');


INSERT INTO employee (first_name, last_name, role_id, manager_id)
value('john', 'Doe', '1', '6')
,('Eden', 'Hazard', '2', '1')
, ('Frank', 'Lampard', '3', '9')
, ('Micheal', 'Balack', '4', '4');
