import { CheckService } from "../domain/use-cases/checks/check-service"
import { sendEmailLogs } from "../domain/use-cases/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repositories.implemention"
import { CronService } from "./cron/cron-service"
import { emailService } from "./email/email.service"

const fileSystemlogRepository = new LogRepositoryImplementation( new FileSystemDatasource() )

 //CREAMOS LA INSTANCIA DEL EMAIL SERVICE
 const email = new emailService( )

export class ServerApp{

    public static start (){

        const url = 'https://www.youtube.com/'

        console.log('Server app started')

        //MANDAMOS LOS CORREO USANDO EL CASO DE USO(CON SUS INYECCIONES DE DEPENDENCIAS)
        // new sendEmailLogs(
        //     email,
        //     fileSystemlogRepository
        // ).execute(['afanador1106@gmail.com', 'afanador1106@gmail.com'])

        
        // CronService.CreateJob(  
            
        //     '*/2 * * * * * ', //cada 2 segundos
        //     () => {

        //         new CheckService(
        //             fileSystemlogRepository,
        //             () => console.log('success'),
        //             (error) => console.log(error),
        //         ).execute(url)
        //     },
           

        // )
    }


}


