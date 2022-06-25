DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
    id INTEGER PRIMARY KEY AUTO INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    constraint fk_role FOREIGN KEY(role_id) REFERENCES role(id) ,
    constraint fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NUL:
);

