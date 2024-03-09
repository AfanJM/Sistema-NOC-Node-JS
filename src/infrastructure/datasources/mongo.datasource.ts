//aqui es donde trabajamos con la base de datos

import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, SecurityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDataSource {


    //estos son los metodos que se implementan de logDataSource
async saveLog(log: LogEntity): Promise<void> {

    const newLog = await LogModel.create(log)

    await newLog.save()

    console.log('Mongo Log created: ', newLog.id)
}

//aqui hay un error porque el objeto que me devuelve mongo es diferente a mi LogEntity, entonces hay que adaptarlo
async getLog(severityLevel: SecurityLevel): Promise<LogEntity[]> {
   

    const logs = await LogModel.find({
        level: severityLevel
    })

    return logs.map(mongoLog => LogEntity.fromObject(mongoLog) )

 }

}


