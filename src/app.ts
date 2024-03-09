//ESTE ES NUESTRO INICIO DE NUESTRA APP 
import { envs } from "./config/plugins/envs.plugins";
import { mongoDataBase } from "./data/mongo";
import { ServerApp } from "./presentation/server";
import { LogModel } from "./data/mongo";


//funcion anonima autoinvocada
(async () => {

main()
    
}) ()

async function main(){

   await mongoDataBase.connect({

    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,

   })
   
    ServerApp.start()


 
}