import {Action, App, Payload} from 'package-app';
import {
    ChangePasswordPayload,
    ChangePasswordResult,
    CurrentUserSchema,
    UsersActionName
} from "package-types";
import {UserService} from "../services/user";
import {compare, encrypt} from "../helpers/password";

export default new class ChangePassword implements Action{
    getName(): string{
        return UsersActionName.ChangePassword
    }

    getValidationSchema(): any {
        return {
            currentPassword: { type: 'string', min: 5, max: 30 },
            newPassword: { type: 'string', min: 5, max: 30 },
            currentUser: {type: 'object', props: CurrentUserSchema}
        };
    }

    async execute(payload: Payload<ChangePasswordPayload>): Promise<ChangePasswordResult> {
        const { newPassword, currentPassword, currentUser } = payload.params;
        try {
            const user = await UserService.getUserByEmail(currentUser.email);
            const { password } = user;
            const isMatch = await compare(currentPassword, password);
            if(!isMatch) {
                return { success: false, errorMessage: 'Поточний пароль введено невірно!' };
            }
            const hashedPassword = await encrypt(newPassword);
            await UserService.updateUser(currentUser.id, {password: hashedPassword});
            return {success: true};
        } catch (err) {
            App.logError(err);
            return {success: false};
        }
    }
}





