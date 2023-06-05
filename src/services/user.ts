import User from "../models/user";
import { SafeUser, Role } from 'package-types'
import {App} from "package-app";
import {uuid} from "uuidv4";
import {Op} from "sequelize";

interface userCheckResult {
    success: boolean;
    message?: string;
}

export class UserService {
    public static async GetUserById(id: string, safe: boolean = false): Promise<SafeUser> {
        const attributes = safe? [ 'id', 'email', 'nickname', 'avatar', 'role' ]
            : [ 'id', 'email', 'nickname', 'avatar', 'role', 'password' ];
        return User.findByPk(id, { raw: true, attributes });
    }

    public static async GetUserByEmail(email: string, safe: boolean = false): Promise<User | undefined> {
        const attributes = safe? [ 'id', 'email', 'nickname', 'avatar', 'role' ]
            : [ 'id', 'email', 'nickname', 'avatar', 'role', 'password' ]
        try {
            return User.findOne({
                where: {
                    email
                }, attributes
            });
        } catch (err) {
            App.logError(err);
        }
    }

    public static async RegisterUser(email: string, nickname: string, password: string, avatar?: string): Promise<boolean> {
        try {
            await User.create({
                id: uuid(),
                email,
                password,
                nickname,
                avatar,
                role: Role.USER,
            });
            return true;
        } catch (err) {
            App.logError(err);
            return false;
        }
    }

    public static async CheckUserEmailAndNickname(email: string, nickname: string): Promise<userCheckResult> {
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    {email},
                    {nickname}
                ]
            }
        });
        const result: userCheckResult = {success: true, message: ''};
        users.forEach(user => {
            if(user.email === email) {
                result.success = false;
                result.message = 'Користувач з таким e-mail вже зареєстрований!';
            }
            if(user.nickname === nickname) {
                result.success = false;
                result.message += '\nНікнейм зайнятий!';
            }
        });
        return result;
    }

    public static async GetUsers(ids: string[]): Promise<SafeUser[]> {
        return User.findAll({where: {id: ids}, attributes: [ 'id', 'email', 'nickname', 'avatar', 'role' ]});
    }

    // public static async BanUser(id: string, reason: string): Promise<>
}
