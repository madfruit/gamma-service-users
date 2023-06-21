import { Action, Payload } from 'package-app';
import {GetUserByEmailPayload, UsersActionName} from "package-types";
import {UserService} from "../services/user";

export default new class GetUser implements Action{
    getName(): string{
        return UsersActionName.GetUserByEmail;
    }

    getValidationSchema(): any {
        return {
            email: { type: 'string', max: 100}
        };
    }

    async execute(payload: Payload<GetUserByEmailPayload>) {
        return UserService.getUserByEmail(payload.params.email);
    }
}





