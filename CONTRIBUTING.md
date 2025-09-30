# Contributing to Signal

Thank you for your interest in contributing to Signal! This document provides guidelines and instructions for contributing to the project.

## 🎯 Project Overview

Signal is an enterprise-grade AI-powered financial intelligence platform built with React, integrating Claude AI for sophisticated analysis, and real-time financial data from multiple APIs.

## 🏗️ Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/dcthedeveloper/Signal.git
cd Signal

# Run setup script (recommended)
./setup.sh

# Or manually:
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

## 📁 Project Structure

```
Signal/
├── src/
│   ├── api/              # API integration services
│   ├── components/       # React components
│   │   ├── layout/       # Layout components
│   │   └── shared/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── store/            # Zustand state management
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
└── ...config files
```

## 🎨 Code Style

### General Guidelines
- Use functional components with hooks
- Follow React best practices
- Write self-documenting code
- Add comments for complex logic
- Use meaningful variable names

### ESLint
We use ESLint to enforce code quality:
```bash
npm run lint
```

All code must pass linting before being merged.

### Component Structure
```javascript
import { useState, useEffect } from 'react';
import { SomeIcon } from 'lucide-react';
import { Button, Card } from '../components/shared/ui';

const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Effect logic
  }, []);

  const handleAction = () => {
    // Handler logic
  };

  return (
    <div className="container">
      {/* Component JSX */}
    </div>
  );
};

export default MyComponent;
```

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Use semantic color variables (primary, secondary, etc.)
- Maintain responsive design

## 🔧 Making Changes

### Branch Naming
- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `chore/` - Maintenance tasks

Example: `feature/add-portfolio-charts`

### Commit Messages
Follow conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example: `feat: add real-time portfolio value updates`

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow code style guidelines
   - Add comments where needed
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Include screenshots for UI changes

## 🧪 Testing

### Manual Testing
- Test on multiple screen sizes
- Check browser console for errors
- Verify all user interactions work
- Test with and without API keys

### Before Submitting
- [ ] Code passes ESLint
- [ ] Build succeeds without errors
- [ ] Changes work in development mode
- [ ] Changes work in production build
- [ ] Responsive design maintained
- [ ] No console errors
- [ ] Documentation updated if needed

## 📝 Documentation

### Code Comments
Add comments for:
- Complex algorithms
- Non-obvious business logic
- API integration details
- Workarounds or hacks

### README Updates
Update README.md if you:
- Add new features
- Change setup process
- Add new dependencies
- Modify project structure

### API Documentation
Document new API integrations:
- Endpoint details
- Response format
- Error handling
- Rate limiting

## 🎯 Areas for Contribution

### High Priority
- [ ] Historical portfolio performance charts
- [ ] Advanced filtering and sorting in portfolio table
- [ ] Real-time WebSocket price updates
- [ ] User authentication
- [ ] Database persistence
- [ ] Mobile app (React Native)

### Medium Priority
- [ ] Export portfolio to PDF
- [ ] Advanced data visualizations
- [ ] Social sharing features
- [ ] Browser notifications
- [ ] Offline support (PWA)

### Nice to Have
- [ ] Dark/light theme customization
- [ ] Multiple portfolio support
- [ ] Automated trading integration
- [ ] Custom alert rules
- [ ] API rate limit dashboard

## 🐛 Bug Reports

### Before Reporting
1. Check if the bug already exists in issues
2. Verify it's not related to your environment
3. Test in the latest version

### Bug Report Template
```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome 120, Safari 17]
- Node version: [e.g., 18.17.0]

**Additional context**
Any other relevant information.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature related to a problem?**
Describe the problem or need.

**Describe the solution**
A clear description of what you want to happen.

**Describe alternatives**
Alternative solutions you've considered.

**Additional context**
Mockups, examples, or other context.
```

## 🔐 Security

### Reporting Security Issues
**Do not report security issues publicly.**

Email security concerns to the repository owner or use GitHub's security advisory feature.

### Security Guidelines
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Follow OWASP security best practices
- Validate all user inputs
- Sanitize data before display

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all.

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Other unprofessional conduct

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Security**: Email repository owner
- **General**: Check README.md and DEMO.md

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section (future)
- Release notes for significant contributions
- GitHub contributor graphs

## 🚀 Release Process

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create GitHub release
4. Deploy to production
5. Announce on social media

---

**Thank you for contributing to Signal! 🙏**

Every contribution, no matter how small, helps make Signal better for everyone.
