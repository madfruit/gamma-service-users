import {Action, App, Payload} from 'package-app';
import {
    ChangeRolePayload, ChangeRoleResult,
    CurrentUserSchema, Role,
    UsersActionName
} from "package-types";
import {UserService} from "../services/user";

export default new class ChangeRole implements Action{
    getName(): string{
        return UsersActionName.ChangeRole
    }

    getValidationSchema(): any {
        return {
            userId: { type: 'string' },
            role: { type: 'string', enum: Object.values(Role) },
            currentUser: {type: 'object', props: CurrentUserSchema}
        };
    }

    async execute(payload: Payload<ChangeRolePayload>): Promise<ChangeRoleResult> {
        const { role, userId } = payload.params;
        try {
            await UserService.updateUser(userId, {role});
            return {success: true};
        } catch (err) {
            App.logError(err);
            return {success: false};
        }
    }
}





