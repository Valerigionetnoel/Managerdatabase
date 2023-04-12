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
                    'Update an employee role',
                    'Exit'
                ]
            },
        ])
        .then((choice) => {
            if ('View all department' === choice.start){
                connection.query('SELECT * FROM department',(err,data) => {
                    if (err) throw (err)
                    console.table(data)
                    doinq()
                })
            }else if('Add a department' === choice.start){
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What would you call the department?'
                    }
                ]).then((department) => {
                    
                })

            } else if ('Exit' === choice.start){
                process.exit()
            }
           
        })
}