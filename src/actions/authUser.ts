import {Action, App, Payload} from 'package-app';
import {AuthPayload, AuthResult, SafeUser, UsersActionName} from "package-types";
import {UserService} from "../services/user";
import {TokenType} from "../interfaces/tokenType";
import TokenService from "../services/token";

export default new class Auth implements Action{
    getName(): string{
        return UsersActionName.Auth
    }

    getValidationSchema(): any {
        return {access: { type: 'string' }};
    }

    async execute(payload: Payload<AuthPayload>): Promise<AuthResult> {
        const { access } = payload.params;
        try {
            const userId = await TokenService.checkAndGetUserId(access, TokenType.Access);
            const user = await UserService.GetUserById(userId, true);
            if (!user) {
                throw new Error(`User with id ${userId} does not exist!`)
            }
            return { currentUser: user };
        } catch (err) {
            App.logError(err);
            return {};
        }
    }
}





