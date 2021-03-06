const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

/*db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('connected');
});*/



const initChoices = function () {
    return inquirer.prompt({
        type: 'list',
        name: 'choices',
        message: 'what would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'Add a department', 'add a role', 'add an employee', 'update an employee role','exit']
    }).then(({choices}) => {
        switch (choices) {
            case 'view all departments':
               // console.log('yippy');
               viewDept();
                break;
            case  'view all roles':
                viewRoles();
                break;
            case  'view all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'add a role':
                addRole();
                break;
            case 'add an employee':
                addEmployee();
                break;
            case 'update an employee role':
                updateEmpRole();
                break; 
            case 'exit':
                break;                         
        }

    });

};

initChoices();

const viewDept = () => {
  const sql = `SELECT * FROM Department`
 db.query(sql, (err,result) => {
   if(err) {
       throw err
   }
   console.table(
    result
   )
   initChoices()
 })
 ;
      
};

const viewRoles = () => {
    const sql = `SELECT * FROM role`
   db.query(sql, (err,result) => {
     if(err) {
         throw err
     }
     console.table(
      result
     )
     initChoices()
   })
        
  };

  const viewEmployees = () => {
    const sql = 
    `SELECT Employee.*, role.title 
    AS Employee_role, role.salary AS Employee_salary,
    CONCAT(e.first_name, '',e.last_name) AS manager
    FROM Employee
    LEFT JOIN role
    ON Employee.role_id = role.id
    LEFT JOIN Employee e on Employee.manager_id = e.id
    ORDER BY Employee.id`

   db.query(sql, (err,result) => {
     if(err) {
         throw err
     }
     console.table(
      result
     )
     initChoices()
   })
        
  };


  const addDepartment = () => {
      inquirer.prompt({ 
          type: 'text',
          name: 'deptname',
          message: 'what is new department name?'
  }).then(({deptname}) => {
      const sql = `INSERT INTO Department(name)
      VALUES(?)`;

      db.query(sql, deptname,(err,result) => {
          if (err) {
              throw err;
          }
          console.table(result)
          viewDept();
          initChoices();
      })
  })
  };

  const addRole = () => {
      inquirer.prompt([
          {
       type: 'text',
       name: 'title',
       message: 'what is new roles title?'
          },
          {
              type: 'decimal',
              name: 'salary',
              message: 'what is new roles salary?'
          },
          {
            type: 'integer',
            name: 'Department_id',
            message: 'what is the department id of this role?'  
          }
      ]).then(({title, salary, Department_id}) => {
          const sql = `INSERT INTO role (title, salary, Department_id)
          VALUES (?, ?, ?)`;
          
        db.query(sql,[title, salary, Department_id], (err, result) => {
            if(err) {
                console.log(err);
            }
            console.table(result)
            viewRoles();
            initChoices();
        })
      });
  };


  const addEmployee = () => {
      inquirer.prompt([
          {
              type: 'text',
              name: 'first_name',
              message: 'what is employees first name?'
          },
          {
              type: 'text',
              name: 'last_name',
              message: 'what is employees last name'
          },
          {
              type: 'integer',
              name: 'role_id',
              message: 'what is employees role id?'
          },
          {
              type: 'integer',
              name: 'manager_id',
              message: 'what is the employees managers id?'
          }
      ]).then(({first_name, last_name, role_id, manager_id}) => {
        const sql = `INSERT INTO Employee(first_name, last_name, role_id, manager_id)
        VALUES(?, ?, ?, ?)`

     

        db.query(sql,[first_name, last_name, role_id, manager_id], (err, result) => {
            if(err) {
                throw err;
            }
           
                console.table(result);
                viewEmployees();
                initChoices();
            
            
        })
      });
  };

  const updateEmpRole = () => {
      
      inquirer.prompt([ 
          { 
            type: 'decimal',
            name: 'newRoleId',
            message: 'what is the employees new role id?'
          },
          {
            type: 'decimal',
          name: 'id',
          message: 'what is the id of employee whos role you would like to update? '  
          }
      ]).then(({newRoleId, id}) => {
          const sql = `UPDATE Employee SET role_id = ?
          WHERE id = ?`;
          db.query(sql,[newRoleId, id],(err, result) => {
              if(err) {
                  throw err;
              }
              console.table(result);
              viewEmployees();
              initChoices()
          })
      })
  }
 

 /* `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, role.salary, department.name AS department,
  CONCAT(e.first_name, ' ', e.last_name) AS manager
  FROM employee
  INNER JOIN role ON role.id = employee.role_id
  INNER JOIN department ON department.id = role.department_id
  LEFT JOIN employee e on employee.manager_id = e.id
  ORDER BY employee.id;*/

  /*`SELECT Employee.*, role.title 
    AS Employee_role, role.salary AS Employee_salary,
    CONCAT(e.first_name, '',e.last_name) AS manager
    FROM Employee
    LEFT JOIN role
    ON Employee.role_id = role.id
    LEFT JOIN Employee e on Employee.manager_id = e.id
    ORDER BY Employee.id;
    ` */ 