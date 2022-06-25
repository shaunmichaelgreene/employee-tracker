INSERT INTO department 
    (id, name)
    VALUES
    (1, 'Executive Office'),
    (2, 'Operations'),
    (3, 'Sales'),
    (4, 'R&D'),
    (5, 'Legal'),
    (6, 'Admin'),
    (7, 'IT');

INSERT INTO role 
    (id, title, salary, department_id)
    VALUES
    (1, 'President & CEO', 250,000, 1),
    (2, 'Operations Manager', 125,000, 2),
    (3, 'Business Development Manager', 100,000, 3),
    (4, 'Account Manager', 75,000, 3),
    (5, 'Chief Legal Counsel', 150,000, 5),
    (6, 'IT Administrator', 95,000, 7),
    (7, 'Assistant to the Regional Manager', 60,000, 6),
    (8, 'Process Engineer', 90,000, 4),
    (9, 'Facilites Manager', 65,000, 2),
    (10, 'Office Manager', 70,000, 6);

INSERT INTO employee 
    (id, first_name, last_name, role_id, manager_id)
    VALUES
    (1, 'Shaun', 'Greene'),
    (2, 'Alana', 'McKeel', 1),
    (3, 'Jack', 'Donaghy', 2),
    (4, 'Jim', 'Halpert', 3),
    (5, 'Bob', 'Loblaw', 1),
    (6, 'Maurice', 'Moss', 1),
    (6, 'Erlich', 'Bachman', 2),
    (7, 'Dwight', 'Schrute', 2),
    (8, 'Lucius', 'Fox', 2),
    (9, 'Ron', 'Swanson', 2),
    (10, 'Andy', 'Dwyer', 1),
    (4, 'Anders', 'Holmvik', 3);