import {Action, App, Payload} from 'package-app';
import {RefreshPayload, RefreshResult, UsersActionName} from "package-types";
import {UserService} from "../services/user";
import {TokenType} from "../interfaces/tokenType";
import TokenService from "../services/token";
import {jwtHelper} from "../helpers/jwt";

export default new class Refresh implements Action{
    getName(): string{
        return UsersActionName.Refresh
    }

    getValidationSchema(): any {
        return {refresh: { type: 'string' }};
    }

    async execute(payload: Payload<RefreshPayload>): Promise<RefreshResult> {
        const { refresh} = payload.params;
        try {
            const userId = await TokenService.checkAndGetUserId(refresh, TokenType.Refresh);
            const user = await UserService.getUserById(userId, true);
            if (!user) {
                throw new Error(`User with id ${userId} does not exist!`)
            }
            const tokens = jwtHelper.encodeUserId(userId);
            await TokenService.setTokens(userId, tokens.access, tokens.refresh);
            return { success: true, tokens };
        } catch (err) {
            App.logError(err);
            return { success: false };
        }
    }
}





