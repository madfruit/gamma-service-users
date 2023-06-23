import {Action, App, Payload} from 'package-app';
import {
    FilesActionName,
    RegisterPayload,
    RegisterResult,
    ServiceName,
    UploadFilesPayload, UploadFilesResult,
    UsersActionName
} from "package-types";
import {UserService} from "../services/user";
import {encrypt} from "../helpers/password";

export default new class Register implements Action {
    getName(): string {
        return UsersActionName.Register
    }

    getValidationSchema(): any {
        return {};
    }

    async execute(payload: Payload<RegisterPayload>): Promise<RegisterResult> {
        const {email, nickname, password, avatar: avatarFile} = payload.params;
        let success = false;
        const checkResult = await UserService.checkUserEmailAndNickname(email, nickname);
        if (!checkResult.success) {
            return checkResult;
        }
        let avatarKey;
        if (Array.isArray(avatarFile)) {
            App.logError('Array sent instead of a file', avatarFile);
            return {success, message: 'Додано більше одного файлу. Будь ласка, спробуйте ще раз з одним файлом'};
        }
        try {
            if(avatarFile) {
                const {fileKeys} = await App.call<UploadFilesPayload, UploadFilesResult>(ServiceName.Files, FilesActionName.UploadFiles, {files: {avatar: avatarFile}});
                const {avatar} = fileKeys;
                if (!avatar) {
                    App.logError('File upload error');
                    return {success, message: 'Не вдалося завантажити файл! Спробуйте ще раз'};
                }
                avatarKey = avatar;
            }
        } catch (err) {
            App.logError('Call fileUpload failed');
        }
        const hashedPassword = await encrypt(password);
        success = true;
        try {
            success = await UserService.registerUser(email, nickname, hashedPassword, avatarKey);
        } catch (err) {
            App.logError(err);
            return {
                success,
                message: 'Помилка реєстрації! Зв\'яжіться з адміністрацією за вказаною в розділі \'Контакти\' поштою, вкажіть час і реєстраційні дані'
            };
        }
        return {success};
    }
}





