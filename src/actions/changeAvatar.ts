import {Action, App, Payload} from 'package-app';
import {
    ChangeAvatarResult,
    CurrentUserSchema, FilesActionName,
    ServiceName,
    UploadFilesPayload, UploadFilesResult,
    UsersActionName
} from "package-types";
import {UserService} from "../services/user";
import {ChangeAvatarPayload} from "package-types/dist/actions/users";

export default new class ChangeAvatar implements Action{
    getName(): string{
        return UsersActionName.ChangeAvatar
    }

    getValidationSchema(): any {
        return {
            avatar: { type: 'object' },
            currentUser: {type: 'object', props: CurrentUserSchema}
        };
    }

    async execute(payload: Payload<ChangeAvatarPayload>): Promise<ChangeAvatarResult> {
        const { avatar, currentUser } = payload.params;
        let avatarUrl = '';
        try {
            const { fileKeys } = await App.call<UploadFilesPayload, UploadFilesResult>(ServiceName.Files, FilesActionName.UploadFiles, {files: {avatar}});
            const { avatar: avatarLink } = fileKeys;
            await UserService.updateUser(currentUser.id, {avatar: avatarLink});
            avatarUrl = avatarLink;
            return { avatar: avatarUrl };
        } catch (err) {
            App.logError(err);
            return {avatar: avatarUrl};
        }
    }
}





