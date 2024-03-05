import { LogDataSource } from "../../domain/datasources/log.datasource";

import { LogEntity, SecurityLevel } from "../../domain/entities/log.entity";

import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImplementation implements LogRepository {

    constructor(
        private readonly logDataSource: LogDataSource,

    ){}
    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }

     
    async getLog(severityLevel: SecurityLevel): Promise<LogEntity[]> {
       return this.logDataSource.getLog(severityLevel)

    }




}