//este archivo es el encargado de guardar en mi base de datos

import fs from 'fs';


import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, SecurityLevel } from '../../domain/entities/log.entity';



export class FileSystemDatasource implements LogDataSource {

  private readonly logPath = 'logs/';
  private readonly allLogsPath    = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath   = 'logs/logs-high.log';

  constructor() {
    this.createLogsFiles();
  }
  

  private createLogsFiles = () => {
    if ( !fs.existsSync( this.logPath ) ) {
      fs.mkdirSync( this.logPath );
    }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach( path => {
      if ( fs.existsSync( path ) ) return;

      fs.writeFileSync( path, '' );
    });
  }


  async saveLog( log: LogEntity ): Promise<void> {
    
    const logAsJson = `${ JSON.stringify(log) }\n`;

    fs.appendFileSync( this.allLogsPath, logAsJson );

    if ( log.level === SecurityLevel.low ) return;

    if ( log.level === SecurityLevel.mediun ) {
      fs.appendFileSync( this.mediumLogsPath, logAsJson );
    } else {
      fs.appendFileSync( this.highLogsPath, logAsJson );
    }

  }


  private getLogFromFile = (path: string): LogEntity[] => {

    const content = fs.readFileSync( path, 'utf8')

    const logs = content.split('\n').map(LogEntity.fromJson);

    return logs

  }





  async getLog(severityLevel: SecurityLevel): Promise<LogEntity[]> {
    
    switch( severityLevel ) {
        case SecurityLevel.low:
          return this.getLogFromFile(this.allLogsPath);

        case SecurityLevel.mediun:
           return this.getLogFromFile(this.mediumLogsPath);

        
        case SecurityLevel.high:
           return this.getLogFromFile(this.highLogsPath);


        default:
          throw new Error(`${ severityLevel } not implemented`);
      }
}



}

