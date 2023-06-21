import {Action, App, Payload} from 'package-app';
import {
    ChangeNicknamePayload, ChangeNicknameResult,
    UsersActionName
} from "package-types";
import {UserService} from "../services/user";

export default new class ChangeNickname implements Action {
    getName(): string {
        return UsersActionName.ChangeNickname
    }

    getValidationSchema(): any {
        return {
            nickname: {type: 'string', min: 3, max: 50}
        };
    }

    async execute(payload: Payload<ChangeNicknamePayload>): Promise<ChangeNicknameResult> {
        const {nickname, currentUser} = payload.params;
        try {
            await UserService.updateUser(currentUser.id, {nickname});
            return {nickname};
        } catch (err) {
            App.logError(err);
            return {errorMessage: 'Не вдалося змінити нікнейм. Спробуйте пізніше', nickname: currentUser.nickname};
        }
    }
}





