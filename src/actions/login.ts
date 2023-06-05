import { Action, Payload } from 'package-app';
import {LoginPayload, LoginResult, SafeUser, UsersActionName} from "package-types";
import {UserService} from "../services/user";
import {compare} from '../helpers/password';
import {jwtHelper} from "../helpers/jwt";
import TokenService from "../services/token";

export default new class Login implements Action{
    getName(): string{
        return UsersActionName.Login
    }

    getValidationSchema(): any {
        return {};
    }

    async execute(payload: Payload<LoginPayload>): Promise<LoginResult> {
        const { email, password } = payload.params;
        const user = await UserService.GetUserByEmail(email);
        if(!user) {
            return { success: false }
        }
        const isMatch = await compare(password, user.password);
        if(!isMatch) {
             return { success: false }
        }
        const safeUser: SafeUser = { id: user.id, email, avatar: user.avatar, role: user.role, nickname: user.nickname, createdAt: user.createdAt };
        const tokens = jwtHelper.encodeUserId(safeUser.id);
        const success = await TokenService.setTokens(user.id, tokens.access, tokens.refresh);

        return { success, tokens }

    }
}





