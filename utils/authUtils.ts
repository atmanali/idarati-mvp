import { authenticationCheck, AuthProps } from "@services/auth";

export const checkAuthentication = async (): Promise<AuthProps> => {
    const { session_token, user } = getAuthInformation();
    if (!session_token || ! user?.username) return Promise.reject();

    const connected = await authenticationCheck();
    if (!connected) {
        deleteAuthInformation();
        return {session_expired: !connected}
    }
    return { session_token, user }
}

const authInformation = 'authInformation';

export const setAuthInformation = (authInfo: AuthProps) =>
    sessionStorage.setItem(authInformation, JSON.stringify(authInfo));

export const deleteAuthInformation = () => sessionStorage.removeItem(authInformation);
const getAuthInformation = (): AuthProps => {
    try{ return JSON.parse(sessionStorage.getItem(authInformation)); }
    catch (e) { return null; }
}

export const getAuthorization = () => {
    const data = getAuthInformation();
    return data?.session_token ? `${data.user.username};${data.session_token}` : '';
}