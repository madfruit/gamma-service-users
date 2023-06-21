import { Action, Payload } from 'package-app';
import { GetUsersPayload, GetUsersResult, UsersActionName} from "package-types";
import {UserService} from "../services/user";

export default new class GetUser implements Action{
    getName(): string{
        return UsersActionName.GetUsers;
    }

    getValidationSchema(): any {
        return {};
    }

    async execute(payload: Payload<GetUsersPayload>): Promise<GetUsersResult> {
        const {userIds} = payload.params;
        const users = await UserService.getUsers(userIds);
        return { users };
    }
}





