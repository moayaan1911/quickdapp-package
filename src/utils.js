import fs from 'fs';
import path from 'path';
import { execa } from 'execa';
import { PACKAGE_MANAGERS, ENV_LOCAL_TEMPLATE } from './constants.js';

export function validateProjectName(name) {
  if (!name) return false;
  if (name.includes(' ')) return false;
  if (!/^[a-zA-Z0-9-_]+$/.test(name)) return false;
  return true;
}

export function isCurrentDirectory(projectPath) {
  return projectPath === '.' || projectPath === './';
}

export function directoryExists(dirPath) {
  return fs.existsSync(dirPath);
}

export function isDirectoryEmpty(dirPath) {
  if (!fs.existsSync(dirPath)) return true;
  const files = fs.readdirSync(dirPath);
  return files.length === 0;
}

export async function checkPackageManager(pm) {
  try {
    await execa(pm, ['--version']);
    return true;
  } catch {
    return false;
  }
}

export async function runCommand(command, args, options = {}) {
  try {
    return await execa(command, args, {
      stdio: options.silent ? 'pipe' : 'inherit',
      cwd: options.cwd || process.cwd(),
      ...options
    });
  } catch (error) {
    throw new Error(`Failed to run ${command} ${args.join(' ')}: ${error.message}`);
  }
}

export async function installDependencies(packageManager, projectDir) {
  const pm = PACKAGE_MANAGERS[packageManager];
  if (!pm) throw new Error(`Unsupported package manager: ${packageManager}`);
  
  const isAvailable = await checkPackageManager(packageManager);
  if (!isAvailable) {
    throw new Error(`${packageManager} is not installed. Please install it first.`);
  }
  
  const [command, ...args] = pm.installCmd.split(' ');
  await runCommand(command, args, { cwd: projectDir });
}

export async function runQuickdappStart(packageManager, projectDir) {
  const pm = PACKAGE_MANAGERS[packageManager];
  if (!pm) throw new Error(`Unsupported package manager: ${packageManager}`);
  
  let command, args;
  
  if (packageManager === 'npm') {
    command = 'npm';
    args = ['run', 'quickdapp-init'];
  } else {
    command = packageManager;
    args = ['quickdapp-init'];
  }
  
  await runCommand(command, args, { cwd: projectDir });
}

export function getProjectPath(projectName) {
  if (isCurrentDirectory(projectName)) {
    return process.cwd();
  }
  return path.resolve(process.cwd(), projectName);
}

export function getProjectName(projectPath) {
  if (projectPath === process.cwd()) {
    return path.basename(process.cwd());
  }
  return path.basename(projectPath);
}

export async function createEnvFile(projectPath) {
  const envPath = path.join(projectPath, '.env.local');
  fs.writeFileSync(envPath, ENV_LOCAL_TEMPLATE);
}

export function parseArguments(args) {
  const parsed = {
    projectName: null,
    packageManager: null,
    help: false,
    version: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    } else if (arg === '--version' || arg === '-v') {
      parsed.version = true;
    } else if (arg === '--pm') {
      parsed.packageManager = args[++i];
    } else if (!arg.startsWith('-') && !parsed.projectName) {
      parsed.projectName = arg;
    }
  }
  
  return parsed;
}