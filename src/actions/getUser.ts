import { Action, Payload } from 'package-app';
import {GetUserPayload, GetUserResult, UsersActionName} from "package-types";
import {UserService} from "../services/user";

export default new class GetUser implements Action{
    getName(): string{
        return UsersActionName.GetUser;
    }

    getValidationSchema(): any {
        return {};
    }

    async execute(payload: Payload<GetUserPayload>) {
        return UserService.GetUserById(payload.params.id);
    }
}





