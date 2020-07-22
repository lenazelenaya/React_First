import PropTypes from "prop-types";

const getFetchUrl = (args: any) => {
  return args.endpoint;
};

const getFetchArgs = (args: any) => {
  const headers: any = {};
  if (!args.attachment) {
    headers['Content-Type'] = 'application/json';
    headers.Accept = 'application/json';
  }
  const token = localStorage.getItem('token');
  if (token && !args.skipAuthorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  let body;
  if (args.attachment) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support attachments.');
    }
    const formData = new FormData();
    formData.append('image', args.attachment);
    body = formData;
  } else if (args.request) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.request);
  }
  return {
    method: args.type,
    headers,
    signal: args.ct,
    ...(args.request === 'GET' ? {} : { body }),
  };
};

export async function throwIfResponseFailed(res: any) {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      //
    }
    throw parsedException;
  }
}

export default async function callWebApi(endpoint: string, type: string) {
  const res = await fetch(endpoint);
  await throwIfResponseFailed(res);
  return res;
}
