import { CheckService } from "../domain/use-cases/checks/check-service"
import { sendEmailLogs } from "../domain/use-cases/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDataSource } from "../infrastructure/datasources/mongo.datasource"
import { postgresLogDataSource } from "../infrastructure/datasources/postgres.datasource"
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repositories.implemention"
import { CronService } from "./cron/cron-service"
import { emailService } from "./email/email.service"

//para guardar ya en FS
const fileSystemlogRepository = new LogRepositoryImplementation( new FileSystemDatasource() )

//para guardar en MONGODB
const logRepository = new LogRepositoryImplementation(new MongoLogDataSource() )

//para guardar en postgresql
const logRepositoryPostgres = new LogRepositoryImplementation(new postgresLogDataSource() )

 //CREAMOS LA INSTANCIA DEL EMAIL SERVICE
 const email = new emailService( )

export class ServerApp{

    public static start (){

        const url = 'https://www.youtube.com/'

        console.log('Server app started')

        //MANDAMOS LOS CORREO USANDO EL CASO DE USO(CON SUS INYECCIONES DE DEPENDENCIAS)
        // new sendEmailLogs(
        //     email,
        //     logRepository
        // ).execute(['afanador1106@gmail.com', 'afanador1106@gmail.com'])

        
        CronService.CreateJob(  
            
            '*/2 * * * * * ', //cada 2 segundos
            () => {

                new CheckService(
                    logRepositoryPostgres,
                    () => console.log('success'),
                    (error) => console.log(error),
                ).execute(url)
            },
           

         )
    }


}


