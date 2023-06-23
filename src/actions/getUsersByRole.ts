import { Action, Payload } from 'package-app';
import {
    CurrentUserSchema,
    GetUsersByRolePayload,
    GetUsersByRoleResult,
    Role,
    UsersActionName
} from "package-types";
import {UserService} from "../services/user";

export default new class GetUserByRole implements Action{
    getName(): string{
        return UsersActionName.GetUsersByRole;
    }

    getValidationSchema(): any {
        return {
            nickname: { type: 'string', nullable: true, optional: true },
            role: { type: 'string', enum: Object.values(Role)},
            currentUser: { type: 'object', props: CurrentUserSchema }
        };
    }

    async execute(payload: Payload<GetUsersByRolePayload>): Promise<GetUsersByRoleResult> {
        const {role, nickname} = payload.params;
        let safeNickname = nickname ?? '';
        const users = await UserService.getUsersByRole(role, safeNickname);
        return { users };
    }
}





