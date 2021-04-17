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
                break;
            case 'add a role':
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
        
  }