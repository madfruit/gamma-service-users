import { App } from 'package-app';
import { config } from './env/env';
import User from "./models/user";
import Token from "./models/token";

const app = App.getInstance();

async function main(): Promise<void> {
    await app.run({
        logger: true,
        logLevel: 'info',
        name: config.name,
    });
}
app.getDBConnection().addModels([User, Token]);
main().then();

