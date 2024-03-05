//  REPOSITORY ->  permitir poder llamar metodos que se encuentran en el datasource, me va a permitir a mi llamar mi datasource

import { LogEntity, SecurityLevel } from "../entities/log.entity";


export abstract class LogRepository { 
    
    abstract saveLog(log: LogEntity): Promise<void>;

    abstract getLog(severityLevel: SecurityLevel): Promise<LogEntity[]>;


}