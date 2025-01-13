export const parseCookie = (cookieString, name) => {
    const token = cookieString?.split(';').find(c => c.trim().startsWith(`${name}=`));
    return token?.split('=')[1];
};