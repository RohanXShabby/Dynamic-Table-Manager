# Contributing to Dynamic Data Table Manager

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

Before creating a bug report:
1. Check existing issues to avoid duplicates
2. Test with the latest version
3. Verify it's not a configuration issue

**Bug Report Template:**

```markdown
**Description:**
Clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node Version: [e.g., 18.17.0]

**Screenshots:**
If applicable

**Additional Context:**
Any other relevant information
```

### Suggesting Features

Feature requests are welcome! Please:
1. Check if it's already suggested
2. Explain the use case
3. Describe the expected behavior
4. Consider implementation complexity

**Feature Request Template:**

```markdown
**Feature Description:**
Clear description of the feature

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How should it work?

**Alternatives Considered:**
Other approaches you've thought about

**Additional Context:**
Mockups, examples, etc.
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- Code editor (VS Code recommended)

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dynamic-table-manager.git
   cd dynamic-table-manager
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/dynamic-table-manager.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   - Navigate to http://localhost:3000

## 📝 Development Guidelines

### Code Style

#### TypeScript
- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable names

```typescript
// Good
interface UserData {
  id: string;
  name: string;
  email: string;
}

// Avoid
const data: any = {};
```

#### React Components
- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use proper prop types

```tsx
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
```

#### Redux
- Use Redux Toolkit
- Keep actions simple and focused
- Use proper typing for state
- Avoid side effects in reducers

```typescript
// Good
const slice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    updateItem: (state, action: PayloadAction<Item>) => {
      // Update logic
    },
  },
});
```

### File Organization

```
component/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests (if added)
└── index.ts               # Barrel export (if needed)
```

### Naming Conventions

- **Components**: PascalCase (`DataTable.tsx`)
- **Utilities**: camelCase (`csvUtils.ts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ROWS`)
- **Types**: PascalCase (`TableRow`, `ColumnConfig`)
- **Functions**: camelCase (`handleClick`, `fetchData`)

### Comments

- Write self-documenting code
- Add comments for complex logic
- Use JSDoc for functions/components

```typescript
/**
 * Exports table data to CSV format
 * @param rows - Array of table rows to export
 * @param columns - Column configuration
 * @returns void - Triggers file download
 */
export function exportToCSV(rows: TableRow[], columns: ColumnConfig[]): void {
  // Implementation
}
```

## 🧪 Testing

### Manual Testing

Before submitting:
1. Test all affected features
2. Test on multiple browsers
3. Test responsive design
4. Check console for errors
5. Verify no TypeScript errors

```bash
# Check for TypeScript errors
npm run build

# Run linter
npm run lint
```

### Future: Automated Tests

When adding tests (future enhancement):

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📋 Pull Request Process

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow code style guidelines
   - Keep commits focused and atomic
   - Write clear commit messages

3. **Test thoroughly**
   - Test all functionality
   - Check for console errors
   - Verify responsive design

4. **Update documentation**
   - Update README if needed
   - Add/update code comments
   - Update CHANGELOG.md

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(table): add column reordering
fix(csv): handle empty CSV files
docs(readme): update installation steps
style(table): improve cell padding
refactor(redux): simplify state structure
```

### Submitting Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the template

3. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   
   ## Testing
   - [ ] Tested locally
   - [ ] Tested on multiple browsers
   - [ ] Tested responsive design
   
   ## Screenshots
   If applicable
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-reviewed code
   - [ ] Commented complex code
   - [ ] Updated documentation
   - [ ] No console errors
   - [ ] TypeScript compiles without errors
   ```

4. **Respond to feedback**
   - Address review comments
   - Make requested changes
   - Push updates to same branch

## 🎨 Component Development

### Creating New Components

1. **Create component file**
   ```tsx
   // components/NewComponent.tsx
   'use client';
   
   import React from 'react';
   import { Box, Typography } from '@mui/material';
   
   interface NewComponentProps {
     title: string;
   }
   
   export default function NewComponent({ title }: NewComponentProps) {
     return (
       <Box>
         <Typography variant="h4">{title}</Typography>
       </Box>
     );
   }
   ```

2. **Use Material UI components**
   - Leverage existing MUI components
   - Follow MUI theming
   - Use sx prop for styling

3. **Make it responsive**
   ```tsx
   <Box sx={{
     display: 'flex',
     flexDirection: { xs: 'column', md: 'row' },
     gap: 2,
   }}>
   ```

### Redux Integration

1. **Add to slice**
   ```typescript
   // store/tableSlice.ts
   reducers: {
     newAction: (state, action: PayloadAction<Data>) => {
       // Update state
     },
   }
   ```

2. **Use in component**
   ```tsx
   import { useAppDispatch, useAppSelector } from '@/store/hooks';
   import { newAction } from '@/store/tableSlice';
   
   export default function Component() {
     const dispatch = useAppDispatch();
     const data = useAppSelector((state) => state.table.data);
     
     const handleAction = () => {
       dispatch(newAction(data));
     };
   }
   ```

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for functions
- Explain complex logic
- Document props and types
- Keep comments up to date

### User Documentation

When adding features, update:
- README.md - User guide
- FEATURES.md - Feature list
- TESTING_GUIDE.md - Testing steps
- CHANGELOG.md - Version history

## 🐛 Debugging

### Common Issues

**Issue: TypeScript errors**
```bash
# Check types
npm run build

# Fix auto-fixable issues
npm run lint -- --fix
```

**Issue: Redux state not persisting**
- Check browser localStorage
- Verify persist configuration
- Clear browser cache

**Issue: Component not re-rendering**
- Check if using proper hooks
- Verify state updates are immutable
- Use React DevTools

### Debugging Tools

- **React DevTools**: Inspect component tree
- **Redux DevTools**: Monitor state changes
- **Browser DevTools**: Console, Network, Performance
- **TypeScript**: Check types and errors

## 🔍 Code Review

### What Reviewers Look For

- Code quality and readability
- Proper TypeScript usage
- Following project conventions
- Test coverage (when applicable)
- Documentation updates
- Performance considerations
- Accessibility compliance

### Being a Good Reviewer

- Be constructive and respectful
- Explain reasoning for suggestions
- Approve when ready
- Test the changes locally

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Create an Issue
- **Chat**: Join our Discord (if available)
- **Email**: Contact maintainers

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## ✨ Thank You!

Every contribution, no matter how small, is valuable and appreciated!

---

**Happy Coding! 🚀**
