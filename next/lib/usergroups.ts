export interface UserGroup {
  id: string;
  usergp_id: string;
  name: string;
  system_type: string;
  description: string;
  action: string;
}

export const get = async (): Promise<UserGroup[]> => {
  const res = await fetch(`${process.env.APP_URL}/usergroups`);

  if (!res.ok) {
    throw new Error(`Failed to fetch user groups: ${res.statusText}`);
  }

  const json = await res.json();
  // console.log(json);

  return json;
};
