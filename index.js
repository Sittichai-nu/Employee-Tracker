var inquirer = require("inquirer");
var mysql = require("mysql");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Nuid.2013",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employees",
        "View departments",
        "View roles",
        "View employees",
        "Update Employee Role",
        "Update Employee Manager",
        "Remove Employee",
        "Exit"]
    })
    .then(function (answer) {
      console.log(answer.action);
      switch (answer.action) {
        case "Add Department":
          department();
          break;

        case "Add Role":
          role();
          break;

        case "Add Employee":
          employee();
          break;

        case "View departments":
          departmentView();
          break;

        case "View  role":
          managerView();
          break;

        case "View employees":
          roleView();
          break;

        case "Update Employee Role":
          employeeUpdate();
          break;

        case "Remove Employee":
          employeeRemove();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function department() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: ["Enter new department name"]
    })

    .then(function (answer) {
      console.log(answer)
      var str = answer.department;
      var name = str.split(" ");
      console.log(name);
      var query = "INSERT INTO department (name) VALUES ?";
      connection.query(query, [[name]], function (err, res) {

        runSearch();
      });
    })
}

function role() {
  inquirer
    .prompt({
      name: "title",
      type: "input",
      message: ["Enter role"]
    })
    .then(function (answer) {
      var title = answer.title;

      inquirer
        .prompt({
          name: "salary",
          type: "input",
          message: ["Enter salary"]
        })
        .then(function (answer) {
          var salary = answer.salary;

          inquirer
            .prompt({
              name: "department_id",
              type: "input",
              message: ["Enter department id"]
            })
            .then(function (answer) {
              var department_id = answer.department_id;

              console.log(`title: ${title} salary: ${salary} department id: ${department_id}`);

              var query = "INSERT INTO role (title, salary, department_id) VALUES ?";
              connection.query(query, [[[title, salary, department_id]]], function (err, res) {
                if (err) {
                  console.log(err);
                }

                runSearch();
              });
            })
        })
    })
}

function employee() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: ["Enter Employee First Name then Last Name"]
    })

    .then(function (answer) {
      console.log(answer)
      var str = answer.employee;
      var firstAndLastName = str.split(" ");
      console.log(firstAndLastName);
      var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
      connection.query(query, [[firstAndLastName]], function (err, res) {

        runSearch();
      });
    })
}

function departmentView() {
  var query = "SELECT name FROM department";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].name);
    }
  });
}
function roleView() {
  inquirer
    .prompt({
      name: "roleView",
      type: "input",
      message: "Enter a role to view)?"
    })
    .then(function (answer) {
      var query = "SELECT title";
      connection.query(query, { title: answer.roleView }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("title: " + res[i].title + " || salary: " + res[i].salary + " || department_ id: " + res[i].department_id);
        }

        runSearch();
      });
    });
}

function managerView() {
  var query = "SELECT id, first_name, last_name FROM Employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
    }

    runSearch();
  });
}

function employeeUpdate() {
  console.log('updating emp');
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "Enter employee id",
    })
    .then(function (answer) {
      var id = answer.id;

      inquirer
        .prompt({
          name: "roleId",
          type: "input",
          message: "Enter role id",
        })
        .then(function (answer) {
          var roleId = answer.roleId;

          var query = "UPDATE employee SET role_id=? WHERE id=?";
          connection.query(query, [roleId, id], function (err, res) {
            if (err) {
              console.log(err);
            }
            runSearch();
          });
        });
    });
}


function employeeRemove() {
  inquirer
    .prompt({
      name: "employeeRemove",
      type: "input",
      message: "To REMOVE an employee, enter the Employee id",

    })
    .then(function (answer) {
      console.log(answer);
      var query = "DELETE FROM employee WHERE ?";
      var newId = Number(answer.employeeRemove);
      console.log(newId);
      connection.query(query, { id: newId }, function (err, res) {
        runSearch();

      });
    });
}
