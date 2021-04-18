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
        choices: ['view all departments', 'view all roles', 'view all employees', 'Add a department', 'add a role', 'add an employee', 'update an employee role']
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
 })
      
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
   })
        
  };

  const viewEmployees = () => {
    const sql = `SELECT Employee.*, role.title
    AS Employee_role
    FROM Employee
    LEFT JOIN role
    ON Employee.role_id = role.id`
   db.query(sql, (err,result) => {
     if(err) {
         throw err
     }
     console.table(
      result
     )
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
            
            
        })
      });
  };

  const updateEmpRole = () => {
      viewEmployees();
      viewRoles();
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
          })
      })
  }
 

  /*`SELECT * FROM Employee`*/ 