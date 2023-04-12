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
            if ('View all department' === choice.start) {
                viewAllDepartment()
            } else if ('Add a department' === choice.start) {
                addADepartment()
            } else if ('Exit' === choice.start) {
                process.exit()
            } else if ('Update an employee role'=== choice.start) {
                updateEmployeeRole()
            } else if ('View all roles' === choice.start) {
                viewAllRoles()
            } else if ('View all employees' === choice.start) {
                viewAllEmployees()
            } else if ('Add a role' === choice.start) {
                addARole()
            } else if ('Add an employee' === choice.start){
                addAnEmployee()
            }

        })
}

function addADepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What would you call the department?'
        }
    ]).then((data) => {
        connection.query('INSERT INTO department (name) VALUES (?)', [data.department], (err, data) => {
            if (err) throw (err)
            console.log('Department added!')
            doinq()
        }
        )
    })
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeetoupdate',
            message: 'Which employee would you like to update?',
            choices: [
                {
                    name:'John Doe', value: 1
                },
                {
                    name:'Mike Chan', value: 2
                },
                {
                    name:'Ashley Rodriguez', value: 3
                },
                {
                    name:'Kevin Tupik', value: 4
                },
                {
                    name:'Kunal Singh', value: 5
                },
                {
                    name:'Malia Brown', value: 6
                },
                {
                    name:'Sarah Lourd', value: 7
                },
                {
                    name:'Tom Allen', value: 8
                }
            ]
        },
        {
            type: 'list',
            name: 'roleid',
            message: 'What is the new role?',
            choices: [
                {
                    name:'Sale lead', value: 1
                },
                {
                    name:'Saleperson', value: 2
                },
                {
                    name:'Lead Engineer', value: 3
                },
                {
                    name:'Software Engineer', value: 4
                },
                {
                    name:'Account Manager', value: 5
                },
                {
                    name:'Accountant', value: 6
                },
                {
                    name:'Legal Team Lead', value: 7
                },
                {
                    name:'Lawyer', value: 8
                }
            ]
        }
    ]).then ((data) => {
        connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [data.roleid, data.employeetoupdate],(err, data) => {
            if (err) throw (err)
            console.log('Role updated!')
            doinq()
        })
    })

}

function viewAllRoles() {
    connection.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON department_id = department.id', (err, data) => {
        if (err) throw (err)
        console.table(data)
        doinq()
    })
}

function viewAllDepartment() {
    connection.query('SELECT * FROM department', (err, data) => {
        if (err) throw (err)
        console.table(data)
        doinq()
    })
}

function viewAllEmployees() {
    connection.query('SELECT employee.id, first_name, last_name, title, salary, manager_id, name AS department FROM employee JOIN role ON role_id = role.id JOIN department ON department_id = department.id', (err, data) => {
        if (err) throw (err)
        console.table(data)
        doinq()
    })
}

function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What would you call this role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'list',
            name: 'dept_id',
            message: 'In what department would it be?',
            choices:[
                {
                    name: 'Sales', value: 1
                },
                {
                    name: 'Engineering', value: 2
                },
                {
                    name: 'Finance', value: 3
                },
                {
                    name: 'Legal', value: 4
                }
            ]
        }
    ]).then((data) => {
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [data.role, data.salary, data.dept_id], (err, data) => {
            if (err) throw (err)
            console.log('Role added!')
            doinq()
        }
        )
    })
}

function addAnEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_n',
            message: 'What is the first name?'
        },
        {
            type: 'input',
            name: 'last_n',
            message: 'What is the last name?'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is its role?',
            choices: [
                {
                    name:'Sale lead', value: 1
                },
                {
                    name:'Saleperson', value: 2
                },
                {
                    name:'Lead Engineer', value: 3
                },
                {
                    name:'Software Engineer', value: 4
                },
                {
                    name:'Account Manager', value: 5
                },
                {
                    name:'Accountant', value: 6
                },
                {
                    name:'Legal Team Lead', value: 7
                },
                {
                    name:'Lawyer', value: 8
                }
            ]
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is its manager?',
            choices:[
                {
                    name: 'John Doe', value: 1
                },
                {
                    name: 'Ashley Rodriguez', value: 3
                },
                {
                    name: 'Kunal Singh', value: 5
                },
                {
                    name: 'Sarah Lourd', value: 7
                },
                {
                    name: 'None', value: null,
                }
            ]
        }
    ]).then((data) => {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.first_n, data.last_n, data.role_id, data.manager_id], (err, data) => {
            if (err) throw (err)
            console.log('Emplyee added!')
            doinq()
        }
        )
    })
}