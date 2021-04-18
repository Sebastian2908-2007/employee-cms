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
                break;
            case 'update an employee role':
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
    const sql = `SELECT * FROM Employee`
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
      })
  }

 