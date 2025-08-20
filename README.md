# 🚀 QuickDapp CLI

**🎯 The fastest way to create production-ready Web3 dApps**

<div align="center">

# 📚 **[Click here for detailed commands guide](https://quickdapp.vercel.com/docs)**

</div>

_One command. Full-stack. Ready to ship._

---

## ⚡ Quick Start

```bash
# Create a new dApp project
npx quickdapp my-awesome-dapp

# Or install in current directory
npx quickdapp .

# Choose your favorite package manager
npx quickdapp my-project --pm pnpm
```

**That's it!** 🎉 Your Web3 dApp is ready with smart contracts, beautiful UI, and multi-chain support.

---

## 📦 Installation & Usage

### Create New Project

```bash
# NPX (Recommended)
npx quickdapp my-project-name
npx quickdapp my-crypto-wallet --pm pnpm
npx quickdapp trading-bot --pm npm
npx quickdapp defi-app --pm yarn

# Global Installation
npm install -g quickdapp
quickdapp my-project-name
quickdapp my-project --pm pnpm

# Install in Current Directory
npx quickdapp .
npx quickdapp . --pm pnpm
npx quickdapp ./
npx quickdapp ./ --pm yarn

# Interactive Mode (prompts for project name)
npx quickdapp
```

### User Flow

1. **🎨 Beautiful CLI Intro** - ASCII art with creator branding
2. **📁 Project Name** - Specify name or use current directory (`.` or `./`)
3. **📦 Package Manager Selection** - Choose from:
   - 🟢 **pnpm** (recommended - fast & efficient)
   - 🔵 **npm** (classic & reliable)
   - 🟡 **yarn** (modern alternative)
4. **⚠️ Directory Check** - Confirms if current directory is not empty
5. **🔄 Template Cloning** - Downloads from GitHub
6. **📦 Dependencies Installation** - Installs all packages
7. **🔧 Smart Contract Setup** - Foundry installation and compilation
8. **⚡ Auto-Build Process** - Builds contracts and Next.js app
9. **🔗 Git Repository** - Fresh git repo (detached from template)
10. **🎉 Success Message** - Next steps and instructions

### Post-Installation Steps

After successful installation, your project is automatically built and ready! Navigate to your project and:

1. **🚀 Start Your dApp** (project is pre-built for you)

```bash
cd my-awesome-dapp
npm start          # Production server
# or
npm run dev        # Development server
```

2. **🌐 Visit Your dApp**

   - Open [http://localhost:3000](http://localhost:3000)

3. **🔑 Add Thirdweb API Keys**
   - Copy `.env.local.example` to `.env.local`
   - Get API keys: [Thirdweb Dashboard](https://thirdweb.com/dashboard)
   - Add your keys to `.env.local`

### Available Development Commands

```bash
npm start              # Start production server
npm run dev           # Start development server with hot reload
npm run build         # Build for production
npm run lint          # Run ESLint
```

---

## 🌟 Features

| Feature                     | Description                                                           |
| --------------------------- | --------------------------------------------------------------------- |
| 🎨 **Modern UI/UX**         | Beautiful, responsive interface built with Next.js 15 & Tailwind CSS  |
| 🔗 **Multi-Chain Support**  | Connect to 80+ blockchains including Ethereum, Polygon, BSC, and more |
| 🤖 **AI Web3 Assistant**    | Built-in AI chatbot to help users navigate Web3                       |
| ⚡ **Gasless Transactions** | Thirdweb integration for seamless user experience                     |
| 🔧 **Smart Contracts**      | Foundry-powered development environment with sample contracts         |
| 📱 **Mobile Responsive**    | Perfect experience across all devices                                 |
| 🎯 **TypeScript Ready**     | Fully typed for better development experience                         |
| 🚀 **Production Ready**     | Optimized builds and deployment configurations                        |
