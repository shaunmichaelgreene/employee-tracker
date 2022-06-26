INSERT INTO department 
    (department_id, department_name)
    VALUES
    (1, 'Executive Office'),
    (2, 'Operations'),
    (3, 'Sales'),
    (4, 'R&D'),
    (5, 'Legal'),
    (6, 'Admin'),
    (7, 'IT');

INSERT INTO role 
    (role_id, title, salary, department_id)
    VALUES
    (1, 'President & CEO', 250000, 1),
    (2, 'Operations Manager', 125000, 2),
    (3, 'Business Development Manager', 100000, 3),
    (4, 'Account Manager', 75000, 3),
    (5, 'Chief Legal Counsel', 150000, 5),
    (6, 'IT Administrator', 95000, 7),
    (7, 'Asst to the Regional Manager', 60000, 6),
    (8, 'Process Engineer', 90000, 4),
    (9, 'Facilites Manager', 65000, 2),
    (10, 'Office Manager', 70000, 6);

INSERT INTO employee 
    (employee_id, first_name, last_name, role_id, manager_id)
    VALUES
    (1, 'Shaun', 'Greene', 1, NULL),
    (2, 'Alana', 'McKeel', 2, 1),
    (3, 'Jack', 'Donaghy', 3, 2),
    (4, 'Jim', 'Halpert', 4, 3),
    (5, 'Bob', 'Loblaw', 5, 1),
    (6, 'Maurice', 'Moss', 6, 1),
    (7, 'Erlich', 'Bachman', 6, 2),
    (8, 'Dwight', 'Schrute', 7, 2),
    (9, 'Lucius', 'Fox', 8, 2),
    (10, 'Ron', 'Swanson', 9, 2),
    (11, 'Andy', 'Dwyer', 10, 1),
    (12, 'Anders', 'Holmvik', 4, 3);