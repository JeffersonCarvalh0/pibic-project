/** Interface of the configuration object */
interface IConfig {
    /** The database URI. */
    DBHost: string
    LOGGER: string
    SECRET: string // This should not be stored directly here.
}

/** Configurations for development */
const dev: IConfig = {
    DBHost: 'mongodb://localhost/cats',
    LOGGER: 'dev',
    SECRET: 'kittens'
}

/** Configurations for tests */
const test: IConfig = {
    DBHost: 'mongodb://localhost/cats-test',
    LOGGER: '',
    SECRET: 'kittens'
}

/** Configurations for production */
const prod: IConfig = {
    DBHost: 'mongodb://localhost/cats',
    LOGGER: 'combined',
    SECRET: 'kittens'
}

/** Interface for the object that stores the configurations */
interface IConfigs { 'dev': IConfig, 'test': IConfig, 'prod': IConfig }

/** The object that holds the configurations */
const config: IConfigs = {
    'dev': dev,
    'test': test,
    'prod': prod
}

// Exports the right configuration based on NODE_ENV variable
export default config[<keyof IConfigs>process.env.NODE_ENV];
