import queryClient from "../utils/queryClientUtils";
import { authKey } from "@services/auth";

const cachedToken = queryClient.getQueryData([authKey]);
export const isBadToken = (sessionToken?: string) => {
    return sessionToken ? !cachedToken || cachedToken!=sessionToken : !cachedToken;
}