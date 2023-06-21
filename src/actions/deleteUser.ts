import {Action, App, Payload} from 'package-app';
import {

    CurrentUserSchema, DeleteUserPayload, DeleteUserResult, Role,
    UsersActionName
} from "package-types";
import {UserService} from "../services/user";

export default new class DeleteUser implements Action{
    getName(): string{
        return UsersActionName.DeleteUser
    }

    getValidationSchema(): any {
        return {
            userId: { type: 'string' },
            currentUser: {type: 'object', props: CurrentUserSchema}
        };
    }

    async execute(payload: Payload<DeleteUserPayload>): Promise<DeleteUserResult> {
        const { userId, currentUser } = payload.params;
        try {
            const userToDelete = await UserService.getUserById(userId);
            if(userToDelete.role === Role.ADMIN) {
                return {success: false, errorMessage: 'Неможливо видалити адміністратора сайту'};
            }
            if(currentUser.id === userId) {
                await UserService.deleteUser(userId);
                return {success: true};
            }

        } catch (err) {
            App.logError(err);
        }
    }
}





