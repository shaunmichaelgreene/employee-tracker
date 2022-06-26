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
    LEFT JOIN department ON employee.role_id = department.department_id);
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

function quit() {
    db.end();
}

taskChoice();