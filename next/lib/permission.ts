interface Permission {
    "name": string;
}


export const get = async (): Promise<Permission[]> => {  
    const res = await fetch(`${process.env.APP_URL}/permission`,{
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store' 
    });
    const json = await res.json();
    console.log('✅ Permissions API response:', json);
    return json;
};
