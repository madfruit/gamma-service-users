import jwt, {JwtPayload, sign, verify} from 'jsonwebtoken';
import { config } from "../env/env";
import {TokenType} from "../interfaces/tokenType";

export class jwtHelper {
    public static encodeUserId(userId: string): {access: string, refresh: string} {
        if(!config.accessTokenSecret || !config.refreshTokenSecret) {
            throw new Error('No secret word for authentication provided!');
        }
        const access = sign({ userId }, config.accessTokenSecret, {expiresIn: '2h'});
        const refresh = sign({ userId }, config.refreshTokenSecret, {expiresIn: '60d'});
        return { access, refresh };
    }

    public static verifyId(token: string, tokenType: TokenType): string {
        if(!config.accessTokenSecret || !config.refreshTokenSecret) {
            throw new Error('No secret word for authentication provided!');
        }
        switch (tokenType) {
            case TokenType.Access:
                const accessResult = verify(token, config.accessTokenSecret) as JwtPayload;
                return accessResult.userId;
            case TokenType.Refresh:
                const refreshResult = verify(token, config.refreshTokenSecret) as JwtPayload;
                return refreshResult.userId;
            default:
                throw new Error(`Token type ${tokenType} is not supported!`);
                break;
        }
    }
}
