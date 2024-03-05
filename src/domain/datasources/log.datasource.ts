//DATASOURCE: origen de datos, de donde vamos a tomar los datos (mongo, fileSystem, sql)
//reglas de negocios para mis datasources

import { LogEntity, SecurityLevel } from "../entities/log.entity";

//se coloca abstract porque no quiero crear instancias de esta clase
//Todos mis datasources deben tener estos metodos, tienen que cumplir con estos metodos 
export abstract class LogDataSource { 
    
    abstract saveLog(log: LogEntity):Promise<void>;

    abstract getLog(severityLevel: SecurityLevel): Promise<LogEntity[]>;


}