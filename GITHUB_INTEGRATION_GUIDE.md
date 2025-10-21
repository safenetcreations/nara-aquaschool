# GitHub Integration Guide for NARA AquaSchool

This guide explains how to use the GitHub integration features in your NARA AquaSchool application.

## 🚀 Features

The GitHub integration includes:
- Browse GitHub repositories by username
- View repository contents (folders and files)
- Display code files with syntax highlighting
- Copy code to clipboard
- Download code files
- Direct links to GitHub

## 📁 Files Created

### 1. **GitHub Service** (`src/services/githubService.js`)
Handles all GitHub API calls:
- Fetch user repositories
- Get repository details
- Browse repository contents
- Read file contents
- Search repositories
- Get commits, branches, contributors, etc.

### 2. **Code Viewer Component** (`src/components/GitHub/CodeViewer.jsx`)
Displays code with:
- Syntax highlighting support
- Copy to clipboard functionality
- Download code feature
- Language detection
- GitHub link integration

### 3. **Repository Viewer Component** (`src/components/GitHub/RepositoryViewer.jsx`)
Browse GitHub repositories:
- List all repositories for a user
- View repository details (stars, forks, language)
- Browse folders and files
- Display file contents
- Navigate breadcrumbs

### 4. **Code Resources Page** (`src/pages/Resources/CodeResources.jsx`)
Complete page with:
- Example code snippets
- GitHub repository browser
- Learning resources links
- Interactive username input

## 🎯 How to Use

### Basic Usage

#### 1. Display a Code Snippet

```jsx
import CodeViewer from './components/GitHub/CodeViewer';

function MyComponent() {
  const code = `
    function hello() {
      console.log("Hello, World!");
    }
  `;

  return (
    <CodeViewer
      code={code}
      language="javascript"
      fileName="hello.js"
      githubUrl="https://github.com/username/repo/blob/main/hello.js"
    />
  );
}
```

#### 2. Browse GitHub Repositories

```jsx
import RepositoryViewer from './components/GitHub/RepositoryViewer';

function MyComponent() {
  return (
    <RepositoryViewer
      username="octocat"  // GitHub username
      initialRepo={null}  // Optional: start with specific repo
    />
  );
}
```

#### 3. Use the GitHub Service Directly

```jsx
import {
  getUserRepositories,
  getFileContent,
  searchRepositories
} from './services/githubService';

async function fetchRepos() {
  try {
    // Get user's repositories
    const repos = await getUserRepositories('octocat');
    console.log(repos);

    // Get file content
    const file = await getFileContent('octocat', 'Hello-World', 'README.md');
    console.log(file.content);

    // Search repositories
    const results = await searchRepositories('react');
    console.log(results);
  } catch (error) {
    console.error(error);
  }
}
```

## 🔐 GitHub Authentication (Optional)

For increased API rate limits, you can add a GitHub personal access token:

### 1. Create a GitHub Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with `public_repo` scope
3. Copy the token

### 2. Add Token to Your App

```jsx
import { setGithubToken } from './services/githubService';

// Set token when user logs in or on app start
setGithubToken('your_github_token_here');
```

### 3. Store in Environment Variables

Add to `.env` file:
```
REACT_APP_GITHUB_TOKEN=your_token_here
```

Then use it:
```jsx
setGithubToken(process.env.REACT_APP_GITHUB_TOKEN);
```

## 🎨 Customization

### Change Code Viewer Theme

Edit `src/components/GitHub/CodeViewer.jsx`:

```jsx
// Change background color
backgroundColor: '#1e1e1e'  // Dark theme
backgroundColor: '#ffffff'  // Light theme

// Change text color
color: '#d4d4d4'  // Dark theme text
color: '#000000'  // Light theme text
```

### Add More Language Colors

Edit `getLanguageColor` function in `CodeViewer.jsx`:

```jsx
const colors = {
  javascript: '#f7df1e',
  python: '#3776ab',
  // Add more languages
  kotlin: '#7F52FF',
  swift: '#FA7343',
};
```

## 📋 Adding to Routes

To add the Code Resources page to your application:

### 1. Update Routes.jsx

```jsx
import CodeResources from './pages/Resources/CodeResources';

// Add to your routes
<Route path="/code-resources" element={<CodeResources />} />
```

### 2. Add Navigation Link

Update your navigation component:

```jsx
<Button
  component={Link}
  to="/code-resources"
  startIcon={<Code />}
>
  Code Resources
</Button>
```

## 🌐 API Rate Limits

GitHub API limits:
- **Unauthenticated:** 60 requests per hour
- **Authenticated:** 5,000 requests per hour

To check your rate limit status:

```jsx
import { githubClient } from './services/githubService';

async function checkRateLimit() {
  const response = await githubClient.get('/rate_limit');
  console.log(response.data);
}
```

## 🔧 Advanced Features

### 1. Search Code in Repositories

```jsx
import axios from 'axios';

async function searchCode(query, repo) {
  const response = await axios.get(
    `https://api.github.com/search/code?q=${query}+repo:${repo}`
  );
  return response.data;
}
```

### 2. Display Repository Statistics

```jsx
import { getRepositoryLanguages, getRepositoryContributors } from './services/githubService';

async function getStats(owner, repo) {
  const languages = await getRepositoryLanguages(owner, repo);
  const contributors = await getRepositoryContributors(owner, repo);

  return { languages, contributors };
}
```

### 3. Show Commit History

```jsx
import { getRepositoryCommits } from './services/githubService';

async function showCommits(owner, repo, branch = 'main') {
  const commits = await getRepositoryCommits(owner, repo, branch);
  commits.forEach(commit => {
    console.log(`${commit.sha.slice(0, 7)} - ${commit.commit.message}`);
  });
}
```

## 📱 Mobile Responsive

All components are mobile-responsive using Material-UI's Grid system:

```jsx
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    {/* Takes full width on mobile, half on desktop */}
  </Grid>
</Grid>
```

## 🎓 Example Use Cases

### 1. Educational Code Examples
Display marine science algorithms and data processing examples

### 2. Student Project Showcase
Allow students to link their GitHub projects

### 3. Open Source Collaboration
Share NARA AquaSchool code with the community

### 4. Tutorial Integration
Include interactive code examples in lessons

### 5. Research Code Repository
Showcase marine research analysis code

## 🐛 Troubleshooting

### Issue: "API rate limit exceeded"
**Solution:** Add GitHub authentication token

### Issue: "Repository not found"
**Solution:** Check username and repo name are correct, ensure repo is public

### Issue: "Failed to fetch repositories"
**Solution:** Check internet connection, verify GitHub API is accessible

### Issue: Code not displaying
**Solution:** Ensure file is text-based (not binary), check file size limits

## 📚 Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Material-UI Documentation](https://mui.com)
- [React Documentation](https://react.dev)

## 🤝 Contributing

To extend the GitHub integration:

1. Add new API calls to `githubService.js`
2. Create new components in `src/components/GitHub/`
3. Update routes in `src/Routes.jsx`
4. Test with various repositories

## 📝 License

This integration is part of NARA AquaSchool and follows the same license.

---

**Need Help?** Check the GitHub API documentation or open an issue in your repository!
