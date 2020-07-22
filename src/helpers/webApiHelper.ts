export async function throwIfResponseFailed(res: any) {
  if (!res.ok) {
    let parsedException = "Something went wrong with request!";
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
