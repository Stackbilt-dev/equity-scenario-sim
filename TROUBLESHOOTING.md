# Troubleshooting Guide

## Common Issues & Solutions

### Issue: `Cannot find module @rollup/rollup-win32-x64-msvc` on Windows

**Problem**: This is a known npm bug with optional dependencies on Windows (see [npm issue #4828](https://github.com/npm/cli/issues/4828))

**Solution 1: Use Yarn (Recommended)**
```bash
# Install yarn globally
npm install -g yarn

# Install dependencies with yarn
yarn install

# Run dev server
yarn dev
```

**Solution 2: Clean npm Install**
```bash
# Remove node_modules and lock files
rm -r node_modules
rm package-lock.json

# Reinstall
npm install

# Run dev server
npm run dev
```

**Solution 3: Use npm ci**
```bash
# Clean install using lock file
npm ci

# Run dev server
npm run dev
```

**Solution 4: Build instead of dev**
If you only need to test the build:
```bash
npm run build
npm run preview
```

---

## Installation Issues

### "npm ERR! code ENOENT"

**Cause**: Node.js or npm not properly installed

**Solution**:
```bash
# Check versions
node --version   # Should be v18 or higher
npm --version    # Should be v9 or higher

# Update npm
npm install -g npm@latest
```

### "Port already in use"

**Cause**: Port 5173 is already in use by another process

**Solution 1: Kill the process**
```bash
# On Windows (PowerShell as admin)
Get-Process | Where-Object {$_.Port -eq 5173} | Stop-Process -Force

# On Mac/Linux
lsof -i :5173
kill -9 <PID>
```

**Solution 2: Use different port**
```bash
npm run dev -- --port 3000
```

---

## Development Server Issues

### "Failed to resolve module"

**Cause**: Missing or misnamed component import

**Solution**:
1. Check component name spelling in `components/` folder
2. Verify the import path is correct
3. Clear browser cache (Ctrl+Shift+Delete)

### "TypeScript error: Cannot find module"

**Cause**: Type definitions missing

**Solution**:
```bash
# Reinstall dependencies
rm -r node_modules
npm install  # or yarn install
```

---

## Build Issues

### Build fails with TypeScript errors

**Cause**: Type mismatches in code

**Solution**:
1. Check error messages carefully
2. Review the TypeScript at that line
3. Ensure all types are properly imported
4. See PHASE2_CHANGES.md for type definitions

### Build is very slow

**Cause**: Large bundle or slow system

**Solution**:
1. Try again - first build is slowest
2. Check disk space
3. Close other applications
4. Try `npm run build` instead of `npm run dev`

---

## Runtime Issues

### "localStorage is not defined"

**Cause**: Running in Node.js instead of browser

**Solution**: Only use in browser context, not during server build

### "Component not updating"

**Cause**: Missing dependencies in useMemo/useCallback

**Solution**: Check dependency arrays in hooks:
```typescript
useMemo(() => {
  // calculation
}, [dep1, dep2])  // Include all used variables
```

---

## Browser Compatibility

### App doesn't work in older browsers

**Requirement**: Modern browser with ES6 support

**Supported**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Solution**: Update your browser

### localStorage not working

**Cause**: Private browsing or localStorage disabled

**Solution**:
1. Disable private browsing
2. Check browser storage settings
3. Clear browser data if corrupted

---

## Performance Issues

### App is slow to load

**Cause**: Large JavaScript bundle or slow network

**Solution**:
1. Build for production: `npm run build`
2. Use preview mode: `npm run preview`
3. Check network tab in DevTools
4. Disable browser extensions

### Vesting calculations are slow

**Cause**: Missing memoization

**Solution**: All calculations use `useMemo` - this is normal for first render

---

## Git & Deployment Issues

### Can't clone repository

**Solution**:
```bash
# Check git is installed
git --version

# Clone with HTTPS (if SSH doesn't work)
git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git

# Or with SSH
git clone git@github.com:Stackbilt-dev/equity-scenario-sim.git
```

### Changes not pushed to remote

**Solution**:
```bash
# Check status
git status

# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

---

## Package Manager Issues

### npm vs yarn vs pnpm

**Recommendation**: Use whichever works for your system

```bash
# npm
npm install
npm run dev

# yarn
yarn install
yarn dev

# pnpm
pnpm install
pnpm run dev
```

---

## Environment Setup

### Node.js Installation

**Windows**: Download from [nodejs.org](https://nodejs.org)
- Get the LTS version
- Run installer
- Restart your terminal

**Mac**:
```bash
brew install node
```

**Linux (Ubuntu/Debian)**:
```bash
sudo apt update
sudo apt install nodejs npm
```

---

## Getting Help

### Check These First
1. README.md - Basic setup
2. QUICK_START.md - Quick guide
3. CONTRIBUTING.md - Development guidelines
4. This file - Troubleshooting

### Report Issues
1. GitHub Issues - Report bugs or ask questions
2. Provide error message exactly as shown
3. Include Node.js and npm versions
4. Describe what you were trying to do

### Ask Questions
- GitHub Discussions - General questions
- GitHub Issues - Specific problems
- CODE_OF_CONDUCT.md - Community guidelines

---

## Quick Start Commands

```bash
# Fresh setup
git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git
cd EquityScenarioSim
npm install  # or yarn install
npm run dev  # or yarn dev

# Then open: http://localhost:5173
```

## Useful Links

- **Repository**: https://github.com/Stackbilt-dev/equity-scenario-sim
- **npm Registry**: https://www.npmjs.com/package/cap-table-simulator
- **Node.js**: https://nodejs.org
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev

---

## Advanced Troubleshooting

### Enable Debug Logging

```bash
# Verbose npm output
npm install --verbose

# Debug vite
npm run dev -- --debug
```

### Clear All Caches

```bash
# npm cache
npm cache clean --force

# Clear all node modules
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### System Information

Helpful when reporting issues:
```bash
# Check Node version
node --version

# Check npm version
npm --version

# Check git version
git --version

# Check OS
uname -a  # Mac/Linux
ver       # Windows
```

---

**Still stuck?** Open an issue on [GitHub Issues](https://github.com/Stackbilt-dev/equity-scenario-sim/issues)
