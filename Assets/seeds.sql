-- Add departments
INSERT INTO department (name) VALUES ('Department 1');
INSERT INTO department (name) VALUES ('Department 2');
-- Add roles
INSERT INTO role (title, salary, department_id) VALUES ('Role 1', 50000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Role 2', 60000, 2);
-- Add employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
