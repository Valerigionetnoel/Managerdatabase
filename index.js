const inquirer = require('inquirer')
const cTable = require('console.table')
const mysql = require('mysql2')

inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to see?',
            choices: [
                'View all department',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        },
    ])