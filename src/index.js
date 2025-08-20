import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { 
  TEMPLATE_REPO, 
  PACKAGE_MANAGERS, 
  MESSAGES, 
  HELP_TEXT,
  QUICKDAPP_TITLE,
  ETHEREUM_LOGO
} from './constants.js';
import {
  validateProjectName,
  isCurrentDirectory,
  directoryExists,
  isDirectoryEmpty,
  getProjectPath,
  getProjectName,
  parseArguments,
  installDependencies,
  runQuickdappStart,
  checkPackageManager,
  runCommand
} from './utils.js';

async function showAnimatedIntro() {
  // Clear screen
  console.clear();
  
  // Show QuickDapp title
  console.log(chalk.blue.bold(QUICKDAPP_TITLE));
  console.log();
  console.log(chalk.cyan.bold("                    🚀 Web3 dApp Starter Template 🚀"));
  console.log();
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Show centered creator info
  console.log(chalk.blue(MESSAGES.welcome(true)));
  console.log();
  await new Promise(resolve => setTimeout(resolve, 800));
}

export async function main() {
  const args = process.argv.slice(2);
  const parsed = parseArguments(args);
  
  if (parsed.help) {
    console.log(HELP_TEXT);
    return;
  }
  
  if (parsed.version) {
    const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    console.log(pkg.version);
    return;
  }
  
  // Show animated intro
  await showAnimatedIntro();
  
  let projectName = parsed.projectName;
  let packageManager = parsed.packageManager;
  
  // Get project name if not provided
  if (!projectName) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: MESSAGES.projectPrompt,
        validate: (input) => {
          if (!input.trim()) return 'Project name is required';
          if (!validateProjectName(input.trim())) {
            return 'Invalid project name. Use only letters, numbers, hyphens, and underscores.';
          }
          return true;
        }
      }
    ]);
    projectName = answer.projectName.trim();
  }
  
  const projectPath = getProjectPath(projectName);
  const finalProjectName = getProjectName(projectPath);
  
  // Check directory conditions
  if (isCurrentDirectory(projectName)) {
    console.log(chalk.yellow(`📁 Project location: current directory`));
    if (!isDirectoryEmpty(projectPath)) {
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continue',
          message: MESSAGES.directoryNotEmpty,
          default: false
        }
      ]);
      if (!answer.continue) {
        console.log(chalk.red('Aborted.'));
        return;
      }
    }
  } else {
    console.log(chalk.yellow(`📁 Project location: ${projectPath}`));
    if (directoryExists(projectPath)) {
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continue',
          message: MESSAGES.directoryExists,
          default: false
        }
      ]);
      if (!answer.continue) {
        console.log(chalk.red('Aborted.'));
        return;
      }
    }
  }
  
  // Get package manager if not provided
  if (!packageManager) {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'packageManager',
        message: MESSAGES.packageManagerPrompt,
        choices: Object.values(PACKAGE_MANAGERS).map(pm => ({
          name: pm.label,
          value: pm.name
        })),
        default: 'pnpm'
      }
    ]);
    packageManager = answer.packageManager;
  }
  
  // Validate package manager is available
  const isAvailable = await checkPackageManager(packageManager);
  if (!isAvailable) {
    console.log(chalk.red(`❌ ${packageManager} is not installed. Please install it first.`));
    return;
  }
  
  console.log();
  console.log(chalk.green('✨ Creating your Web3 dApp project...'));
  console.log();
  
  try {
    // Clone template with git
    const spinner = ora(MESSAGES.cloningTemplate).start();
    await runCommand('git', ['clone', `https://github.com/${TEMPLATE_REPO}.git`, projectPath], { silent: true });
    spinner.succeed(MESSAGES.templateCloned);
    
    // Setup and build process with progress bar
    const progressSpinner = ora('🚀 Setting up your Web3 dApp... [0/5]').start();
    
    try {
      // Step 1: Install dependencies (20%)
      progressSpinner.text = '📦 Installing dependencies... [1/5]';
      await installDependencies(packageManager, projectPath);
      
      // Step 2: Install Foundry dependencies (40%)
      progressSpinner.text = '🔧 Installing Foundry dependencies... [2/5]';
      await runCommand('forge', ['install'], { cwd: path.join(projectPath, 'contracts'), silent: true });
      
      // Step 3: Build contracts (60%)
      progressSpinner.text = '⚡ Building smart contracts... [3/5]';
      await runCommand('forge', ['build'], { cwd: path.join(projectPath, 'contracts'), silent: true });
      
      // Step 4: Build Next.js app (80%)
      progressSpinner.text = '🏗️ Building Next.js application... [4/5]';
      if (packageManager === 'npm') {
        await runCommand('npm', ['run', 'build'], { cwd: projectPath, silent: true });
      } else {
        await runCommand(packageManager, ['build'], { cwd: projectPath, silent: true });
      }
      
      progressSpinner.succeed('✅ Your Web3 dApp is built successfully!');
      
    } catch (error) {
      progressSpinner.fail(`❌ Setup failed: ${error.message}`);
      throw error;
    }
    
    // Remove original .git and initialize fresh git repository (before starting server)
    const gitSpinner = ora('🔧 Setting up fresh git repository...').start();
    await runCommand('rm', ['-rf', '.git'], { cwd: projectPath });
    await runCommand('git', ['init'], { cwd: projectPath });
    gitSpinner.succeed('✅ Fresh git repository initialized!');
    
    
    // Success messages
    console.log();
    console.log(chalk.green.bold(MESSAGES.success(packageManager)));
    console.log();
    
    if (!isCurrentDirectory(projectName)) {
      console.log(chalk.magenta(`📁 First, navigate to your project:\n   cd ${finalProjectName}`));
      console.log();
    }
    
  } catch (error) {
    console.log();
    console.log(chalk.red(`❌ Error: ${error.message}`));
    console.log();
    console.log(chalk.yellow('💡 Try the following:'));
    console.log(chalk.yellow('   • Check your internet connection'));
    console.log(chalk.yellow('   • Ensure you have the required dependencies installed'));
    console.log(chalk.yellow('   • Try running the command again'));
    console.log();
    process.exit(1);
  }
}