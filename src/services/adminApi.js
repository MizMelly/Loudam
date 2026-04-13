const BASE_URL = 'http://localhost:5000/api/admin';
const getToken = () => localStorage.getItem('token');

export const apiAdmin = {
  getAllComplaints: async () => {
    try {
      const res = await fetch(`${BASE_URL}/complaints`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return await res.json();
    } catch (err) {
      console.error('Fetch complaints error:', err);
      return { success: false };
    }
  },

  updateComplaintStatus: async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/complaints/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status }),
      });
      return await res.json();
    } catch (err) {
      console.error('Update status error:', err);
      return { success: false };
    }
  },
};