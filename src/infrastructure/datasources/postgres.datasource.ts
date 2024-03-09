//aqui es donde trabajamos con postgreSQL

import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, SecurityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient()

const severityEnum = {

    low: SeverityLevel.HIGH,
    mediun: SeverityLevel.MEDIUM,
    high: SeverityLevel.LOW
}

//logica para guardar y ver datos en DB
export class postgresLogDataSource implements LogDataSource {


    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level]

        const newLog = await prisma.logModel.create({

            data: {
                ...log,
                level: level
            }

        })

        console.log('postgres save log')

    }
   async  getLog(severityLevel: SecurityLevel): Promise<LogEntity[]> {
       
        const level = severityEnum[severityLevel]

        const log = await prisma.logModel.findMany({
            where: {
                level: level
            }
        })

       return log.map(log => LogEntity.fromObject(log));

    }





}