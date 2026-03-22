# Contributing to Cap Table Simulator

Thank you for your interest in contributing to the Cap Table Simulator! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and collaborative. We're building this together for the community.

## Getting Started

### Prerequisites
- Node.js (v18+)
- Git
- Basic knowledge of React and TypeScript

### Setup for Development

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cap-table-simulator.git
   cd cap-table-simulator
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Bug Reports

Found a bug? Please create an issue with:
- Clear title describing the bug
- Step-by-step reproduction steps
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### Feature Requests

Have an idea? Submit a feature request with:
- Clear description of the feature
- Why you think it's useful
- Example use cases
- Any design mockups (if applicable)

### Code Contributions

1. **Check existing issues** to avoid duplicate work
2. **Comment on an issue** if you want to work on it
3. **Create a feature branch** from `main`
4. **Make your changes** with clear, descriptive commits
5. **Test thoroughly** - run dev server and verify functionality
6. **Follow code style** - see guidelines below
7. **Submit a Pull Request** with detailed description

### Documentation Contributions

Documentation improvements are valuable! You can:
- Fix typos and clarify confusing sections
- Add examples and code snippets
- Improve setup instructions
- Add FAQs based on common questions

## Code Style Guidelines

### TypeScript
- Use strict types - avoid `any` unless unavoidable
- Export interfaces for component props
- Use discriminated unions for related types
- Add JSDoc comments for complex functions

Example:
```typescript
interface ComponentProps {
  title: string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({ title, onChange, disabled }) => {
  // Component implementation
};
```

### React Components
- Use functional components with hooks
- Keep components focused (single responsibility)
- Extract complex logic into custom hooks
- Use `useMemo` for expensive calculations
- Export component as default

Example:
```typescript
const MyComponent: React.FC<MyComponentProps> = (props) => {
  const memoizedValue = useMemo(() => {
    // expensive calculation
  }, [dependencies]);

  return <div>{/* component JSX */}</div>;
};

export default MyComponent;
```

### Styling
- Use Tailwind CSS utility classes
- Follow existing color scheme
- Maintain responsive design patterns
- Use consistent spacing (gap-8, p-6, etc.)

### File Organization
```
components/
├── FeatureName.tsx          (component file)
├── FeatureHook.ts           (custom hook if needed)
└── types.ts                 (types used by component)

App.tsx                       (main component)
types.ts                      (shared types)
index.tsx                     (entry point)
```

## Commit Messages

Write clear, descriptive commit messages:

```
feat: Add pool target input component

- Add slider for pool percentage targeting
- Include health indicators
- Add actionable recommendations
- Support responsive layout

Closes #123
```

Format:
- Start with type: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Brief summary (50 chars max)
- Blank line
- Detailed description if needed
- Reference issues with `Closes #123`

## Pull Request Process

1. **Update dependencies** if needed (`npm install`)
2. **Build and test** locally:
   ```bash
   npm run build
   npm run dev
   ```
3. **Check for TypeScript errors**:
   ```bash
   # TypeScript checking built into dev server
   ```
4. **Write a clear PR description**:
   - What problem does it solve?
   - How does it solve it?
   - Are there any breaking changes?
   - Testing done

5. **Link related issues**:
   ```
   Closes #123
   Related to #456
   ```

6. **Be responsive** to review feedback

## Testing

- **Manual testing**: Use the dev server to test your changes
- **No breaking changes**: Ensure existing features still work
- **Edge cases**: Test with various inputs and scenarios
- **Responsive design**: Check on mobile, tablet, and desktop

## Documentation Updates

When you add a feature, please update:
- `README.md` - Add to features list
- Component JSDoc - Explain component purpose
- `CHANGES.md` or phase-specific docs - Document the change
- Code comments - Clarify complex logic

## Development Workflow

### Small Changes
```
main → feature branch → code → PR → merge
```

### Large Features
```
main → feature branch → sub-branches for parts → PR → merge
```

### Bug Fixes
```
main → bugfix branch → code → PR → merge
```

## Review Process

- At least one review required
- Address feedback constructively
- Push updates to the same branch
- Rebase and merge when approved

## Release Process

Maintainers will:
- Review PRs regularly
- Test changes thoroughly
- Update version numbers
- Merge to main and publish

## Questions?

- Check existing documentation
- Look at similar components for patterns
- Open a discussion issue
- Comment on related issues

## Recognition

Contributors are recognized in:
- Commit history
- Release notes
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Development Tips

### Useful Commands
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build

# Check TypeScript (built into IDE)
# Use your editor's TypeScript support
```

### Component Patterns

**Using Tooltip**:
```typescript
import Tooltip from './Tooltip';

<Tooltip text="Help text here">
  <svg>...</svg>
</Tooltip>
```

**Currency Formatting**:
```typescript
const formatCurrency = (value: number) => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}k`;
  return `$${value.toFixed(0)}`;
};
```

**Responsive Grid**:
```typescript
<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
  {/* Items here */}
</div>
```

## Common Issues

**TypeScript errors after changes?**
- Check component prop types
- Verify state type correctness
- Ensure imports are correct

**Styling not showing?**
- Verify Tailwind class names are spelled correctly
- Check responsive breakpoint prefix
- Clear build cache if needed

**Component not updating?**
- Check dependencies in useMemo
- Verify state updates are correct
- Check memoization logic

---

Thank you for contributing! Your efforts help make Cap Table Simulator better for everyone. 🙌
