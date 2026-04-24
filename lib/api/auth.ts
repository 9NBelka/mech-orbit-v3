const API_URL = 'https://api.crmmech.com';

export async function loginRequest(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }

  return response.json();
}

export async function registerStep1(data: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  workshop_name: string;
  address: string;
  city: string;
  language: string;
}) {
  const res = await fetch(`${API_URL}/api/v1/workshops/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}
