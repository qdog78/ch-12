const inquirer = require('./inquirer');
const database = require('./database');

async function startApp() {
  try {
    await database.connect();
    await inquirer.presentOptions();
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  } finally {
    await database.disconnect();
  }
}

startApp();
