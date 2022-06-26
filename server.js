const inquirer = require('inquirer');
const validator = require('validator');
const cTable = require('console.table');
const db = require('./db/connection');

const taskChoice = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'taskChoice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a New Department',
                'Add a New Employee',
                'Add a New Role',
                'Update an Existing Employee Role',
                'Quit']
        })
        .then((selection) =>    {
            switch (selection.taskChoice) {
                case 'View All Departments':
                    getDepartments();
                    break;
                case 'View All Roles':
                    getRoles();
                    break;
                case 'View All Employees':
                    getEmployees();
                    break;
                case 'Add a New Department':
                    addDepartment();
                    break;
                case 'Add a New Role':
                    addRole();
                    break;
                case 'Add a New Employee':
                    addEmployee();
                    break;
                case 'Update an Existing Employee Role':
                    updateRole();
                    break;
                case 'Quit':
                    quit();
                    break;
            };
        });
};

function getDepartments() {
    return db.query("SELECT * from department", function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log("DEPARTMENTS")
            console.log("================")
            console.table(result);
            taskChoice();
        }
    })
}

function getRoles() {
    return db.query("SELECT role.*, department.department_name FROM role LEFT JOIN department ON role.department_id = department.department_id;", function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log("ROLES")
            console.log("================")
            console.table(result);
            taskChoice();
        }
    })
}

function getEmployees() {

    return db.query(`SELECT employee.*, department.department_name, role.title, role.salary
    FROM ((employee
    INNER JOIN role ON employee.role_id = role.role_id)
    LEFT JOIN department ON employee.role_id = department.department_id)
    ORDER BY employee_id;
    `, function(error, result) {
        if (error) {
            throw error;
        } else {
            console.log("EMPLOYEES")
            console.log("================")
            console.table(result);
            taskChoice();
        }
    })
}

function addDepartment() {
    inquirer
        .prompt({
                type: 'input',
                name: 'name',
                message: 'Please enter the name of the new department:'
            })
        .then(response => {
            const newDepartment = response.department_name;
            db.query(`INSERT INTO department(name) VALUE ('${newDepartment}');`,
            console.log("New Department Successfully Added!"))
            getDepartments();
        });
};

function addRole() {
    departments = [];
    db.query('SELECT department_name FROM department', function (err, response) {
        if (err) throw err;
        for (i =0; i < response.length; i++) {
                departments.push(response[i].department_name);
        }
    })
    inquirer
        .prompt([{
                type: 'input',
                name: 'title',
                message: 'Please enter the name of the new role:'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Please enter the salary for the new role:'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Please choose the department for the new role:',
                choices: departments
            }        
        ])
        .then(response => {
            const newRoleName = response.title;
            const newRoleSalary = response.salary;
            const newRoleDepartmentName = response.department;
            var newRoleDepartmentId = (departments.indexOf(response.department) + 1);
            db.query(`INSERT INTO role(title, salary, department_id) VALUE ('${newRoleName}', ${newRoleSalary}, ${newRoleDepartmentId})`,
            console.log("New Role Successfully Added!"))
            getRoles();
        });
};

function addEmployee() {
    employees = [];
    roles =[];
    db.query('SELECT employee.first_name, employee.last_name FROM employee', function (err, response) {
        // console.log(response)
        if (err) throw err;
        for (i =0; i < response.length; i++) {
                employeeFirstName = response[i].first_name;
                employeeLastName = response[i].last_name;
                employeeName = employeeFirstName + ' ' + employeeLastName;
                // console.log(employeeName);
                employees.push(employeeName);
        }
        console.log(employees)
    })

    db.query('SELECT title FROM role', function (err, response) {
        if (err) throw err;
        for (i =0; i < response.length; i++) {
            roles.push(response[i].title)
        }    
    })
    inquirer
        .prompt([{
                type: 'input',
                name: 'first_name',
                message: 'Please enter the first name of the new employee:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Please enter the last name of the new employee:'
            },
            {
                type: 'list',
                name: 'title',
                message: 'Please choose the role for the new employee:',
                choices: roles
            },        
            {
                type: 'list',
                name: 'manager',
                message: 'Please select the manager that the new employee will report to:',
                choices: employees
            }
        ])
        .then(response => {
            const newEmployeeFirstName = response.first_name;
            const newEmployeeLastName = response.last_name;
            const newEmployeeRole = response.title;
            const newEmployeeRoleId = (roles.indexOf(response.title) + 1);
            const newEmployeeManagerName = response.manager;
            const newEmployeeManagerId = (employees.indexOf(response.manager) + 1);
            var newEmployeeId = (employees.indexOf(response.manager) + 1);
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${newEmployeeFirstName}', '${newEmployeeLastName}', ${newEmployeeRoleId}, ${newEmployeeManagerId})`,
            console.log("New Employee Successfully Added!"))
            getEmployees();
        });

};

// function getManager(employeeId) {
//     let managers = db.query(`SELECT manager_id FROM employee`);
//     let employees = db.query(`SELECT employee.first_name, employee.last_name from employee`)
//     let employeesNamesQuery = db.query(`SELECT employee.first_name, employee.last_name from employee`)
//     let managerIdQuery = db.query(`SELECT manager_id FROM employee WHERE employee_id = ${employeeId};`);
//     let managerNameQuery = db.query(`SELECT employee.first_name, employee.last_name from employee WHERE employee_id = ${manager_id};`);
//     let subordinatesQuery = db.query(`SELECT employee.first_name, employee.last_name from employee WHERE manager_id = ${manager_id};`);


//     console.log(managers);
// }

function quit() {
    db.end();
}

taskChoice();