//caso de uso

import { emailService } from "../../presentation/email/email.service"
import { LogEntity, SecurityLevel } from "../entities/log.entity"
import { LogRepository } from "../repository/log.repository"

interface sendLogUseCases {

    execute: (to: string | string []) => Promise<boolean>
}

export class sendEmailLogs implements sendLogUseCases {


    constructor(
        private readonly emailService: emailService,
        private readonly logRepository: LogRepository
    ){}

    
    async execute (to: string | string [] ) {


        try {
            
          const sent =  await this.emailService.sendEmailWithFileSystemLog(to)

          if(!sent) throw new Error(`Could not send email to ${to}`) 

          const log = new LogEntity({
            message: `Log email sent to: ${to}`,
            level: SecurityLevel.high,
            createdAt: new Date(),
            origin: "sendEmailLogs"
        })
        this.logRepository.saveLog(log)

          return true

        } catch (error) {

            const log = new LogEntity({
                message: `${error}`,
                level: SecurityLevel.high,
                createdAt: new Date(),
                origin: "sendEmailLogs"
            })
            this.logRepository.saveLog(log)
            
            return false
        }
        
        return true
    }
    


}