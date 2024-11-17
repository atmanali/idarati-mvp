import { getAuthorization } from "./authUtils";

type ResponseDataType<T> = {
  status: number;
  data?: T;
}

export const initRequest = ( method: string = "get", HeadersAndBody?: { headers?: {}; body?: any },) => {
  let headers: any;
  let body: any;
  try {
    headers = HeadersAndBody?.headers;
    body = HeadersAndBody?.body;
  }
  catch(error){}
  const myHeaders = new Headers({
    "Content-Type": "application/json",
    "Authorization": getAuthorization(),
    ...headers,
  });
  const init: RequestInit = {
    method: method.toUpperCase(),
    headers: myHeaders,
  };
  if (body) init.body = JSON.stringify(body);
  return init;
};

export async function formatResponse<T>(response:Response, formattingCallBack ?: (data: any) => T): Promise<ResponseDataType<T>> {
  if (response.status >= 400) return Promise.reject();
  const formattedOutput = formattingCallBack ? formattingCallBack(await response.json()) : await response.json();
  console.log({status: response.status, ...formattedOutput})
  return {status: response.status, ...formattedOutput};
}