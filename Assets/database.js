const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
      database: 'EMPLOYEES',
    });
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
    }
  }

  async getAllDepartments() {
    const [rows] = await this.connection.query('SELECT * FROM department');
    return rows;
  }

  async getAllRoles() {
    const [rows] = await this.connection.query(`
      SELECT role.*, department.name AS department_name
      FROM role
      JOIN department ON role.department_id = department.id
    `);
    return rows;
  }

  async getAllEmployees() {
    const [rows] = await this.connection.query(`
      SELECT 
        employee.*,
        role.title AS job_title,
        department.name AS department_name,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    return rows;
  }

  async addDepartment(name) {
    const [result] = await this.connection.query('INSERT INTO department (name) VALUES (?)', [name]);
    return result.insertId;
  }

  async addRole(title, salary, departmentId) {
    const [result] = await this.connection.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, departmentId]
    );
    return result.insertId;
  }

  async addEmployee(firstName, lastName, roleId, managerId) {
    const [result] = await this.connection.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [firstName, lastName, roleId, managerId]
    );
    return result.insertId;
  }

  async updateEmployeeRole(employeeId, roleId) {
    await this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  }
}

module.exports = new Database();
