import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:5090/api', // Update with your API base URL
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response && error.response.status === 401) {
    //   // Handle unauthorized error
    //   // alert("Session expired or unauthorized. Redirecting to login...");
    //   // window.location.href = '/login'; // Redirect to login
    // }
    return Promise.reject(error);
  }
);

export default apiClient;
