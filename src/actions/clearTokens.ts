import {Action, App, Payload} from 'package-app';
import {
    ClearTokensPayload,
    ClearTokensResult, CurrentUserSchema,
    UsersActionName
} from "package-types";
import TokenService from "../services/token";

export default new class ClearTokens implements Action {
    getName(): string{
        return UsersActionName.ClearTokens
    }

    getValidationSchema(): any {
        return {
            currentUser: {type: 'object', props: CurrentUserSchema}
        };
    }

    async execute(payload: Payload<ClearTokensPayload>): Promise<ClearTokensResult> {
        const { currentUser } = payload.params;
        try {
            await TokenService.RemoveTokens(currentUser.id)
            return {success: true};
        }catch (err) {
            App.logError(err);
            return {success: false};
        }
    }
}





