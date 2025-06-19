import axios from 'axios';

export async function getMembers() {
  const response = await axios.get('http://localhost:3001/members');
  return response.data;
}

export async function getMembersById(id) {
  const response = await axios.get(`http://localhost:3001/members/${id}`);
  return response.data;
}

export async function updateMembersById(id, data) {
  console.log('server update:', id, data);
  const response = await axios.put(`http://localhost:3001/members/${id}`, data);
  return response.data;
}

export async function deleteMembersById(id) {
  const response = await axios.delete(`http://localhost:3001/members/${id}`);
  return response.data;
}
