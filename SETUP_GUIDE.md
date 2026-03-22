# Complete Setup Guide

This guide ensures easy installation for all users, regardless of their system.

## Quick Start (Recommended: Yarn)

### Step 1: Install Node.js

**Check if already installed**:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

If not installed:
- **Windows/Mac**: Download from [nodejs.org](https://nodejs.org) (LTS version)
- **Linux (Ubuntu)**:
  ```bash
  sudo apt update
  sudo apt install nodejs npm
  ```

### Step 2: Clone the Repository

```bash
git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git
cd EquityScenarioSim
```

### Step 3: Install Yarn (Recommended)

Yarn handles dependencies better on Windows:
```bash
npm install -g yarn
```

Or if you prefer npm, skip this step.

### Step 4: Install Dependencies

**Option A: Using Yarn (Recommended)**
```bash
yarn install
```

**Option B: Using npm**
```bash
npm install
```

If you get an npm error on Windows about `@rollup/rollup-win32-x64-msvc`, try:
```bash
npm install --legacy-peer-deps
```

Or just use yarn instead:
```bash
npm install -g yarn
yarn install  # This usually works better
```

### Step 5: Start Development Server

**With Yarn**:
```bash
yarn dev
```

**With npm**:
```bash
npm run dev
```

You should see:
```
VITE v6.2.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 6: Open in Browser

Open your browser to: **http://localhost:5173/**

✅ You're ready to start using Cap Table Simulator!

---

## Setup by Operating System

### Windows Users

**Best approach**: Use Yarn

```bash
# Install Node.js from nodejs.org (LTS)
# Then in PowerShell or Command Prompt:

npm install -g yarn
git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git
cd EquityScenarioSim
yarn install
yarn dev

# Open http://localhost:5173/
```

**If you get npm errors**: Switch to Yarn (recommended above)

### Mac Users

```bash
# Option 1: Using Homebrew
brew install node
brew install yarn

# Option 2: Download from nodejs.org

# Then:
git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git
cd EquityScenarioSim
yarn install
yarn dev

# Open http://localhost:5173/
```

### Linux Users (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install nodejs npm yarn

git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git
cd EquityScenarioSim
yarn install
yarn dev

# Open http://localhost:5173/
```

---

## Package Manager Options

All three work - choose one:

### Option 1: Yarn (Recommended for Windows)
```bash
# Install globally
npm install -g yarn

# Use for this project
yarn install
yarn dev
yarn build
yarn preview
```

**Pros**: Better Windows support, faster
**Cons**: Requires separate installation

### Option 2: npm (Built-in)
```bash
npm install
npm run dev
npm run build
npm run preview
```

**Pros**: Built into Node.js, no extra installation
**Cons**: Known Windows optional dependencies issue

### Option 3: pnpm (Alternative)
```bash
npm install -g pnpm

# Use for this project
pnpm install
pnpm run dev
pnpm run build
pnpm run preview
```

**Pros**: Fast, efficient
**Cons**: Requires separate installation

---

## Troubleshooting Setup

### Error: "Cannot find module @rollup/rollup-win32-x64-msvc"

**Solution**: Use Yarn instead
```bash
npm install -g yarn
yarn install
yarn dev
```

### Error: "Node is not installed" or "npm not found"

**Solution**: Install Node.js
1. Go to [nodejs.org](https://nodejs.org)
2. Download LTS version
3. Run installer
4. Restart terminal/command prompt
5. Verify: `node --version` and `npm --version`

### Error: "Port 5173 already in use"

**Solution 1**: Use different port
```bash
yarn dev --port 3000  # or npm run dev -- --port 3000
```

**Solution 2**: Kill the process using port 5173
- **Windows (PowerShell as admin)**:
  ```powershell
  Get-Process | Where-Object {$_.Port -eq 5173} | Stop-Process
  ```
- **Mac/Linux**:
  ```bash
  lsof -i :5173
  kill -9 <PID>
  ```

### Error: "git command not found"

**Solution**: Install Git
- **Windows/Mac**: Download from [git-scm.com](https://git-scm.com)
- **Linux**: `sudo apt install git`

---

## Verification Checklist

After setup, verify everything works:

```bash
# 1. Check Node.js version (should be 18+)
node --version

# 2. Check npm version (should be 9+)
npm --version

# 3. Check yarn version (optional, if using yarn)
yarn --version

# 4. Check git version
git --version

# 5. Test the dev server
cd EquityScenarioSim
yarn dev  # or npm run dev

# 6. Open browser to http://localhost:5173/
# 7. You should see the Cap Table Simulator app
```

✅ If all checks pass, you're ready to go!

---

## Directory Structure After Setup

```
EquityScenarioSim/
├── node_modules/          (installed dependencies)
├── src/
│   ├── App.tsx
│   ├── components/        (React components)
│   ├── types.ts
│   └── index.tsx
├── dist/                  (build output, after npm run build)
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── LICENSE
└── ... (other files)
```

---

## Building for Production

When ready to deploy:

```bash
# Build for production
yarn build  # or npm run build

# This creates optimized files in dist/

# Preview the production build locally
yarn preview  # or npm run preview
```

---

## Using the Built Application

After building, you can:

1. **Host on a web server** - Copy `dist/` folder to server
2. **Deploy to Vercel** - `vercel --prod`
3. **Deploy to Netlify** - Connect GitHub repo
4. **Deploy to GitHub Pages** - Use deployment action
5. **Self-host** - Use any static file server

---

## Common Commands Reference

| Command | npm | yarn | What it does |
|---------|-----|------|-------------|
| Install deps | `npm install` | `yarn install` | Install dependencies |
| Dev server | `npm run dev` | `yarn dev` | Start development server |
| Build | `npm run build` | `yarn build` | Build for production |
| Preview | `npm run preview` | `yarn preview` | Preview production build |
| Type check | `tsc --noEmit` | `tsc --noEmit` | Check TypeScript |

---

## Next Steps After Setup

1. ✅ Installation complete
2. 📖 Read [README.md](./README.md) for features overview
3. 🚀 Check [QUICK_START.md](./QUICK_START.md) for quick guide
4. 👨‍💻 Review [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute
5. 🤝 Follow [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) community standards

---

## Getting Help

**Setup Issues?**
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
2. Review error messages carefully
3. Open [GitHub Issue](https://github.com/Stackbilt-dev/equity-scenario-sim/issues)

**Other Questions?**
- 📚 Check [README.md](./README.md)
- 🚀 See [QUICK_START.md](./QUICK_START.md)
- 📋 Read [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## System Requirements Summary

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | v18 | v20+ |
| npm | v9 | v10+ |
| Disk Space | 500MB | 1GB |
| RAM | 2GB | 4GB+ |
| Browser | ES6 support | Latest version |

---

**You're all set!** 🎉 Start building equity models with Cap Table Simulator.
