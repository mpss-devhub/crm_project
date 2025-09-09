export const get = async (): Promise<Record<string, string[]>> => {
  const res = await fetch(`${process.env.APP_URL}/permission`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const json = await res.json();
  return json;
};
