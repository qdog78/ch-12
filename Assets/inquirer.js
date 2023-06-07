const inquirer = require('inquirer');
const tableFormatter = require('./tableFormatter');
const database = require('./database');

const options = [
  'View All Departments',
  'View All Roles',
  'View All Employees',
  'Add a Department',
  'Add a Role',
  'Add an Employee',
  'Update an Employee Role',
  'Exit',
];

async function presentOptions() {
  const { option } = await inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: options,
  });

  switch (option) {
    case 'View All Departments':
      await viewAllDepartments();
      break;
    case 'View All Roles':
      await viewAllRoles();
      break;
    case 'View All Employees':
      await viewAllEmployees();
      break;
    case 'Add a Department':
      await addDepartment();
      break;
    case 'Add a Role':
      await addRole();
      break;
    case 'Add an Employee':
      await addEmployee();
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit(0);
  }
}

async function viewAllDepartments() {
  const departments = await database.getAllDepartments();
  tableFormatter.displayDepartments(departments);
  await presentOptions();
}

async function viewAllRoles() {
  const roles = await database.getAllRoles();
  tableFormatter.displayRoles(roles);
  await presentOptions();
}

async function viewAllEmployees() {
  const employees = await database.getAllEmployees();
  tableFormatter.displayEmployees(employees);
  await presentOptions();
}

async function addDepartment() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:',
  });

  await database.addDepartment(name);
  console.log('Department added successfully!');
  await presentOptions();
}

async function addRole() {
  const departments = await database.getAllDepartments();

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the role:',
      choices: departments.map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);

  await database.addRole(title, salary, departmentId);
  console.log('Role added successfully!');
  await presentOptions();
}

async function addEmployee() {
  const roles = await database.getAllRoles();

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role for the employee:',
      choices: roles.map((role) => ({ name: role.title, value: role.id })),
    },
    {
      type: 'number',
      name: 'managerId',
      message: "Enter the employee's manager ID (leave blank if none):",
    },
  ]);

  await database.addEmployee(firstName, lastName, roleId, managerId || null);
  console.log('Employee added successfully!');
  await presentOptions();
}

async function updateEmployeeRole() {
  const employees = await database.getAllEmployees();
  const roles = await database.getAllRoles();

  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to update:',
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })),
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role for the employee:',
      choices: roles.map((role) => ({ name: role.title, value: role.id })),
    },
  ]);

  await database.updateEmployeeRole(employeeId, roleId);
  console.log('Employee role updated successfully!');
  await presentOptions();
}

module.exports = {
  presentOptions,
};
