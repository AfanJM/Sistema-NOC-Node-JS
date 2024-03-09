import 'dotenv/config';
import * as env from 'env-var';


// validando las variables de entorno con env-var
export const envs =  {

    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_EMAIL_KEY: env.get('MAILER_EMAIL_KEY').required().asString(),

    //mongo: 27017
    MONGO_URL: env.get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),

    //postgres: 5432
    POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
    PORSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
    POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),

    
}
