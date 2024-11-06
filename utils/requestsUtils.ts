export const initRequest = (
  method: string = "get",
  HeadersAndBody?: { headers?: {}; body?: any },
) => {
  let headers: any;
  let body: any;
  try {
    headers = HeadersAndBody?.headers;
    body = HeadersAndBody?.body;
  }
  catch(error){}
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    ...headers,
  });
  const init: RequestInit = {
    method: method.toUpperCase(),
    headers: myHeaders,
  };
  if (body) init.body = JSON.stringify(body);
  return init;
};
