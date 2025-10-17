// src/services/githubService.js - GitHub API integration service
import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

// GitHub API client
const githubClient = axios.create({
  baseURL: GITHUB_API_BASE,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
  }
});

// Add token to requests if available
export const setGithubToken = (token) => {
  if (token) {
    githubClient.defaults.headers.common['Authorization'] = `token ${token}`;
    localStorage.setItem('github_token', token);
  }
};

// Get token from localStorage
export const getGithubToken = () => {
  return localStorage.getItem('github_token');
};

// Remove token
export const removeGithubToken = () => {
  delete githubClient.defaults.headers.common['Authorization'];
  localStorage.removeItem('github_token');
};

// Initialize token if exists
const savedToken = getGithubToken();
if (savedToken) {
  setGithubToken(savedToken);
}

// Get authenticated user
export const getAuthenticatedUser = async () => {
  try {
    const response = await githubClient.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error;
  }
};

// Get user repositories
export const getUserRepositories = async (username, page = 1, perPage = 30) => {
  try {
    const response = await githubClient.get(`/users/${username}/repos`, {
      params: {
        page,
        per_page: perPage,
        sort: 'updated',
        direction: 'desc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};

// Get repository details
export const getRepository = async (owner, repo) => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository:', error);
    throw error;
  }
};

// Get repository contents
export const getRepositoryContents = async (owner, repo, path = '') => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/contents/${path}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repository contents:', error);
    throw error;
  }
};

// Get file content
export const getFileContent = async (owner, repo, path) => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/contents/${path}`);
    const content = response.data.content;
    // Decode base64 content
    const decodedContent = atob(content);
    return {
      content: decodedContent,
      sha: response.data.sha,
      size: response.data.size,
      name: response.data.name,
      path: response.data.path
    };
  } catch (error) {
    console.error('Error fetching file content:', error);
    throw error;
  }
};

// Get repository branches
export const getRepositoryBranches = async (owner, repo) => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/branches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};

// Get repository commits
export const getRepositoryCommits = async (owner, repo, branch = 'main', page = 1, perPage = 30) => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/commits`, {
      params: {
        sha: branch,
        page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching commits:', error);
    throw error;
  }
};

// Search repositories
export const searchRepositories = async (query, page = 1, perPage = 30) => {
  try {
    const response = await githubClient.get('/search/repositories', {
      params: {
        q: query,
        page,
        per_page: perPage,
        sort: 'stars',
        order: 'desc'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching repositories:', error);
    throw error;
  }
};

// Get repository README
export const getRepositoryReadme = async (owner, repo) => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/readme`);
    const content = atob(response.data.content);
    return {
      content,
      name: response.data.name,
      path: response.data.path
    };
  } catch (error) {
    console.error('Error fetching README:', error);
    throw error;
  }
};

// Get repository languages
export const getRepositoryLanguages = async (owner, repo) => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

// Get repository contributors
export const getRepositoryContributors = async (owner, repo, page = 1, perPage = 30) => {
  try {
    const response = await githubClient.get(`/repos/${owner}/${repo}/contributors`, {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching contributors:', error);
    throw error;
  }
};

export default {
  setGithubToken,
  getGithubToken,
  removeGithubToken,
  getAuthenticatedUser,
  getUserRepositories,
  getRepository,
  getRepositoryContents,
  getFileContent,
  getRepositoryBranches,
  getRepositoryCommits,
  searchRepositories,
  getRepositoryReadme,
  getRepositoryLanguages,
  getRepositoryContributors
};
