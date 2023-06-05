import { ServiceConfig } from 'package-app';

export const config: ServiceConfig = {
    name: 'users',
    brokerConfig: {
        nodeID: 'users',
        transporter: 'redis://localhost:6379',
        logger: true,
        logLevel: 'info'
    },
    dbConnection: {
        host: 'localhost',
        dialect: "postgres",
        port: 5432,
        username: 'postgres',
        password: 'L1feStartsN0w',
        database: 'users'
    },
    accessTokenSecret: 'authAccessSecret123123',
    refreshTokenSecret: 'authRefreshSecret123123'
}
export default config;
