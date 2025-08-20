"use server";

interface UserGroup {
    "id" : string;
    "usergp_id": string;
    "name": string;
    "system_type": string;
    "description": string;
}

export const get = async (): Promise<UserGroup[]> => {  
    const data = await fetch(`${process.env.APP_URL}/usergroups`);
    const json = await data.json();
    return json;
};
