import Token from "../models/token";
import {jwtHelper} from "../helpers/jwt";
import {TokenType} from "../interfaces/tokenType";
import {App} from "package-app";

export default class TokenService {
    public static async checkAndGetUserId(token: string, type: TokenType): Promise<string> {
        const dbToken = await Token.findOne({where: { token, type }});
        if(!dbToken) {
            throw new Error(`Token ${token} does not exist in db`);
        }

        const result = jwtHelper.verifyId(token, type);
        if(result !== dbToken.userId) {
            throw new Error('User id from token and are different');
        }

        return result;
    }

    public static async setTokens(userId: string, access: string, refresh: string): Promise<boolean> {
        try {
            await Token.create({token: access, type: TokenType.Access, userId: userId});
            await Token.create({token: refresh, type: TokenType.Refresh, userId: userId});
            return true;
        } catch (err) {
            App.logError(err);
            return false;
        }
    }
}
