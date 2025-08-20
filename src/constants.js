export const TEMPLATE_REPO = 'moayaan1911/quickdapp';

export const PACKAGE_MANAGERS = {
  pnpm: {
    name: 'pnpm',
    label: 'pnpm (recommended - fast & efficient) ⚡',
    installCmd: 'pnpm install',
    runCmd: 'pnpm',
    checkCmd: 'pnpm --version'
  },
  npm: {
    name: 'npm',
    label: 'npm (classic & reliable) 📦',
    installCmd: 'npm install',
    runCmd: 'npm run',
    checkCmd: 'npm --version'
  },
  yarn: {
    name: 'yarn',
    label: 'yarn (modern alternative) 🧶',
    installCmd: 'yarn install',
    runCmd: 'yarn',
    checkCmd: 'yarn --version'
  }
};

export const QUICKDAPP_TITLE = `
    ██████╗ ██╗   ██╗██╗ ██████╗██╗  ██╗██████╗  █████╗ ██████╗ ██████╗ 
   ██╔═══██╗██║   ██║██║██╔════╝██║ ██╔╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗
   ██║   ██║██║   ██║██║██║     █████╔╝ ██║  ██║███████║██████╔╝██████╔╝
   ██║▄▄ ██║██║   ██║██║██║     ██╔═██╗ ██║  ██║██╔══██║██╔═══╝ ██╔═══╝ 
   ╚██████╔╝╚██████╔╝██║╚██████╗██║  ██╗██████╔╝██║  ██║██║     ██║     
    ╚══▀▀═╝  ╚═════╝ ╚═╝ ╚═════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝     
`;

export const ETHEREUM_LOGO = `
                                    ⟦◆⟧
                                   ⟦◆◆◆⟧
                                  ⟦◆◆◆◆◆⟧
                                 ⟦◆◆◆◆◆◆◆⟧
                                ⟦◆◆◆◆◆◆◆◆◆⟧
                               ⟦◆◆◆◆◆◆◆◆◆◆◆⟧
                              ⟦◆◆◆◆◆◆◆◆◆◆◆◆◆⟧
                             ⟦◆◆◆◆◆▼◆◆◆▼◆◆◆◆◆⟧
                              ⟦◆◆◆◆◆◆◆◆◆◆◆◆◆⟧
                               ⟦◆◆◆◆◆◆◆◆◆◆◆⟧
                                ⟦◆◆◆◆◆◆◆◆◆⟧
                                 ⟦◆◆◆◆◆◆◆⟧
                                  ⟦◆◆◆◆◆⟧
                                   ⟦◆◆◆⟧
                                    ⟦◆⟧
`;

export const MESSAGES = {
  welcome: (centered = false) => {
    const lines = [
      "Created with ❤️  by Mohammad Ayaan Siddiqui",
      "🌐 https://moayaan.com",
      "📧 moayaan.eth@gmail.com"
    ];
    
    if (centered) {
      const terminalWidth = process.stdout.columns || 80;
      return lines.map(line => {
        const padding = Math.max(0, Math.floor((terminalWidth - line.length) / 2));
        return ' '.repeat(padding) + line;
      }).join('\n');
    }
    
    return lines.join('\n');
  },

  projectPrompt: '📁 Enter your project name:',
  
  packageManagerPrompt: '📦 Choose your package manager:',
  
  directoryNotEmpty: '⚠️  Current directory is not empty. Continue?',
  
  directoryExists: '⚠️  Directory already exists. Continue?',
  
  cloningTemplate: '🔄 Cloning template from GitHub...',
  templateCloned: '✅ Template cloned successfully!',
  
  installingDeps: '📦 Installing dependencies with',
  depsInstalled: '✅ Dependencies installed!',
  
  buildingContracts: '🔧 Building contracts with Foundry...',
  contractsBuilt: '✅ Contracts compiled successfully!',
  
  buildingApp: '⚡ Building Next.js application...',
  appBuilt: '✅ Application built successfully!',
  
  startingServer: '🚀 Starting development server...',
  serverStarted: '✅ Server started on http://localhost:3000',
  
  success: (pm) => `🎉✨ SUCCESS! Your Web3 dApp is ready to launch! ✨🎉

🎯 Next steps:
   1️⃣ Start your development server:
      ${pm === 'npm' ? 'npm start' : `${pm} start`}
   
   2️⃣ Visit your dApp:
      🌐 http://localhost:3000
   
   3️⃣ Add your Thirdweb API key to .env.local:
      📚 Get your API key: https://thirdweb.com/dashboard`,

  usefulCommands: (pm) => `🛠️  Development commands:
   💻 ${pm === 'npm' ? 'npm run' : pm} dev (development mode)
   🏗️  ${pm === 'npm' ? 'npm run' : pm} build (production build)`,
  
  footer: `
🌟 Love QuickDapp? Give us a star!
   📦 https://github.com/moayaan1911/quickdapp
   🚀 https://github.com/moayaan1911/quickdapp-package

💡 Questions or feedback? Reach out:
   🌐 https://moayaan.com
   📧 moayaan.eth@gmail.com
   
   Made with ❤️  by Mohammad Ayaan Siddiqui`
};

export const HELP_TEXT = `
QuickDapp CLI - Web3 dApp Starter Template

Usage:
  npx quickdapp <project-name>     Create new project
  npx quickdapp .                  Install in current directory
  npx quickdapp ./                 Install in current directory
  npx quickdapp                    Interactive mode

Options:
  --pm <manager>                   Package manager (pnpm|npm|yarn)
  --help, -h                       Show help
  --version, -v                    Show version

Examples:
  npx quickdapp my-awesome-dapp
  npx quickdapp . --pm pnpm
  npx quickdapp my-project --pm yarn

Created by Mohammad Ayaan Siddiqui
🌐 https://moayaan.com
`;