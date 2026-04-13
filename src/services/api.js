

const BASE_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const api = {
  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || {}));
    }

    return data;
  },

  submitComplaint: async (formData) => {
    const token = getToken();

    const res = await fetch(`${BASE_URL}/complaints`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res.json();
  },

  trackComplaints: async ({ email, phone }) => {
    let query = '';

    if (email) query = `email=${email}`;
    if (phone) query = `phone=${phone}`;

    const res = await fetch(`${BASE_URL}/complaints/track?${query}`);
    return res.json();
  },

  getMyComplaints: async () => {
    const token = getToken();

    const res = await fetch(`${BASE_URL}/complaints/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  },
};