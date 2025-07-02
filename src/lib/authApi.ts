const API_BASE = '/api';

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}) {
  const res = await fetch(`${API_BASE}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

// ===================== TEMPORARY MOCKS FOR FRONTEND-ONLY LOGIN =====================
// Remove these mocks and restore real API calls when backend is ready!

export async function loginUser(data: { username: string; password: string }) {
  // Simulate a successful login with any credentials
  return {
    access: 'fake-access-token',
    refresh: 'fake-refresh-token',
  };
}

export async function refreshToken(refresh: string) {
  const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) throw await res.json();
  return res.json(); // { access }
}

export async function requestPasswordReset(email: string) {
  const res = await fetch(`${API_BASE}/password_reset/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function getCurrentUser(token: string) {
  // Return a fake user object
  return {
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
    first_name: 'Test',
    last_name: 'User',
  };
}
// ===================== END TEMPORARY MOCKS =====================
