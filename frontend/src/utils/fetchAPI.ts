export type Params = {
  url: string;
};

type JWT = {
  access_token?: string;
};

const fetchAPI = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const token = localStorage.getItem("token");

  let parsedToken: JWT = {};

  let requestHeaders: any = {
    'Content-Type': 'application/json',
  };

  if (token) {
    parsedToken = JSON.parse(token);
    requestHeaders['Authorization'] = `Bearer ${parsedToken}`
  }

  const response = fetch(`${process.env.REACT_APP_API_GATEWAY_ENDPOINT}${url}`, {
    ...options,
    headers: requestHeaders,
  }).then((res) => {
    if (!res.ok) { throw res }
    return res.json();
  });
  return response;
};

export default fetchAPI;
