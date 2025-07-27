import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const getResources = () => axios.get(`${API_BASE_URL}/resources`);
export const getRecommendations = () => axios.get(`${API_BASE_URL}/recommendations`);

