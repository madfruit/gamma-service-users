import { Action, Payload } from 'package-app';
import {GetUserByEmailPayload, GetUserPayload, GetUserResult, UsersActionName} from "package-types";
import {UserService} from "../services/user";

export default new class GetUser implements Action{
    getName(): string{
        return UsersActionName.GetUser;
    }

    getValidationSchema(): any {
        return {
            email: { type: 'string', max: 100}
        };
    }

    async execute(payload: Payload<GetUserByEmailPayload>) {
        return UserService.GetUserByEmail(payload.params.email);
    }
}





