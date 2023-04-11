const inquirer = require('inquirer')
const cTable = require('console.table')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'manager_db'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log('it worked');
    doinq()
})

function doinq() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'start',
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
        .then((choice) => {
            console.log(choice)
            connection.query('INSERT INTO ')
        })
}