import axios from 'axios';

const GITHUB_BASE_URL = 'https://api.github.com';

/**
 * Fetch GitHub user profile data
 * @param {string} username 
 * @returns {Promise<Object>}
 */
export const fetchUserProfile = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch GitHub user repositories
 * @param {string} username 
 * @returns {Promise<Array>}
 */
export const fetchUserRepos = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_BASE_URL}/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: 100
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
