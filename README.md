<div align="center">
<img src="assets/banner.png" alt="Cap Table Simulator" width="100%" />
</div>

# Cap Table Simulator

A sophisticated cap table simulator designed to model partnership negotiations and understand the financial impact of bringing on new partners. Adjust deal structures, vesting schedules, and performance milestones to see real-time effects on ownership percentages and exit payouts.

**Version**: 0.2.0 | **License**: MIT | **Status**: Production Ready ✅

---

### Documentation

- 🚀 **[Getting Started](#getting-started)** - Quick start guide (below)
- 🆘 **[Troubleshooting](#troubleshooting)** - Common issues & solutions
- 📖 **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- ⚖️ **[LICENSE](./LICENSE)** - MIT License details
- 🔧 **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed OS-specific setup
- 🐛 **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Detailed troubleshooting
- 📋 **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** - Community guidelines

---

## Features

### Core Modeling
- **Two Partnership Paths**: Compare different deal structures (Path A and Path B)
- **Flexible Investment Vehicles**: Model priced rounds or SAFEs with custom valuations
- **Milestone-Based Vesting**: Performance equity that unlocks based on real business milestones
- **Dynamic Cap Table**: Live visualization of ownership distribution as you adjust parameters
- **Founder Flexibility**: Model multiple founders with custom equity splits

### Analysis & Planning
- **Exit Waterfall**: Detailed exit scenario modeling with conservative/base/optimistic cases
- **Milestone Timeline**: Interactive visualization of vesting schedule and performance milestones
- **Pool Target Planning**: Set desired option pool percentage with actionable recommendations
- **Equity Breakdown**: Clear visualization of partner, founder, and pool equity distribution
- **Exit Payouts**: Calculate exact dollar amounts each stakeholder receives at different valuations

### Scenario Management
- **Save Scenarios**: Store deal structures with names and descriptions
- **Scenario History**: Access saved scenarios with timestamps
- **Quick Comparison**: Foundation for comparing multiple deal structures
- **Persistent Storage**: Scenarios saved in browser for future reference

### Safety & Guardrails
- **Strategic Guardrails**: Built-in warnings for common deal structure pitfalls
  - Partner equity caps (max 12%)
  - Minimum employee option pool (min 8%)
  - Founder concentration risks
  - Founder equity disparity checks
- **Health Indicators**: Visual feedback on option pool adequacy

## Getting Started

### Quick Start

The easiest way to get started:

```bash
git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git
cd equity-scenario-sim
npm install -g yarn  # Recommended for Windows users
yarn install         # or: npm install
yarn dev            # or: npm run dev
```

Then open http://localhost:5173/ in your browser

### Prerequisites

- **Node.js**: v18 or higher ([install here](https://nodejs.org))
- **npm**: v9 or higher (comes with Node.js)
- **Recommended**: Yarn for Windows users

### Detailed Setup

For detailed setup instructions for your operating system, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Stackbilt-dev/equity-scenario-sim.git
   cd equity-scenario-sim
   ```

2. **Install dependencies**:
   ```bash
   # Option A: Using Yarn (Recommended for Windows)
   npm install -g yarn
   yarn install

   # Option B: Using npm
   npm install
   ```

3. **Start the development server**:
   ```bash
   # Option A: Using Yarn
   yarn dev

   # Option B: Using npm
   npm run dev
   ```

4. **Open in browser**:
   - The server will show a URL (typically `http://localhost:5173`)
   - Click the link or open in your browser
   - Start modeling equity scenarios!

## Troubleshooting

### Common Setup Issues

**Windows npm error about `@rollup/rollup-win32-x64-msvc`?**
```bash
# Use Yarn instead (recommended for Windows)
npm install -g yarn
yarn install
yarn dev
```

**Port 5173 already in use?**
```bash
# Use a different port
yarn dev --port 3000  # or: npm run dev -- --port 3000
```

**Node.js or npm not found?**
1. Download Node.js from [nodejs.org](https://nodejs.org) (LTS version)
2. Install it
3. Restart your terminal
4. Verify: `node --version` and `npm --version`

**For more help**, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or open a [GitHub Issue](https://github.com/Stackbilt-dev/equity-scenario-sim/issues)

## Development

- **`npm run dev`** or **`yarn dev`** - Start development server with hot reload
- **`npm run build`** or **`yarn build`** - Build for production
- **`npm run preview`** or **`yarn preview`** - Preview production build locally

**Note**: On Windows, Yarn is recommended for better dependency handling

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

## Project Structure

- `App.tsx` - Main application component with core cap table logic
- `components/` - Reusable UI components
- `types.ts` - TypeScript type definitions
- `index.tsx` - Application entry point

## How It Works

The simulator allows you to:
1. **Select a partnership path** with different vesting and equity terms
2. **Configure investment terms** (amount, valuation, vehicle type)
3. **Set up founders** with initial equity splits
4. **Track milestones** to unlock performance-based equity
5. **Monitor the cap table** in real-time as values change
6. **Plan your option pool** target and get recommendations
7. **Model exit scenarios** with different valuations
8. **Visualize vesting timeline** and milestone achievements
9. **Save scenarios** for later reference and comparison

## Interface Layout

The app uses a responsive 4-column design:

- **Column 1: Inputs & Configuration** - Set up the founders, timeline, and milestones
- **Column 2: Deal Configuration** - Configure investment terms, investment vehicle, and option pool targets
- **Column 3: Outcomes & Analysis** - View comparison summaries, scenario details, and vesting timeline
- **Column 4: Exit Analysis & Management** - Model exit scenarios, calculate payouts, and save/manage scenarios

On smaller screens, columns stack responsively for optimal viewing.

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

MIT License means you can:
- ✅ Use commercially
- ✅ Modify the code
- ✅ Distribute copies
- ✅ Use privately
- ✅ Sublicense

The only requirement is to include the original license and copyright notice.

## Contributing

Contributions are welcome! Feel free to:
- Submit issues for bugs or feature requests
- Fork the repository and submit pull requests
- Share improvements and enhancements

## Open Source

This project is fully open sourced and available for anyone to use, modify, and distribute. The source code is maintained on GitHub and welcomes community contributions.

## Credits

- **Original Design & Development**: [Stackbilt](https://stackbilt.dev)
- **Technology Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **Community**: Thanks to all contributors and users

---

Built by [Stackbilt](https://stackbilt.dev) — MIT License
