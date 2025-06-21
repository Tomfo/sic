import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getMembers(searchParameter) {
  const response = await axios.get(`${API_URL}/members`, {
        params: {
          search: searchParameter, // Pass the debounced search term as a query parameter
        },
      });
  return response.data;
}

export async function getMembersById(id) {
  const response = await axios.get(`${API_URL}/members/${id}`);
  return response.data;
}

export async function updateMembersById(id, data) {
  console.log('server update:', id, data);
  const response = await axios.put(`${API_URL}/members/${id}`, data);
  return response.data;
}

export async function deleteMembersById(id) {
  const response = await axios.delete(`${API_URL}/members/${id}`);
  return response.data;
}
