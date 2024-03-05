import { log } from "console";
import { LogEntity, SecurityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute( url: string ):Promise<boolean>;
  }
  
  
  type SuccessCallback = () => void;
  type ErrorCallback = ( error: string ) => void;
  
  
  
  
  export class CheckService implements CheckServiceUseCase {
    
  
    //casos de uso llegan al repositorio, repositorio llega al datasource
    constructor(
      private readonly logRepository: LogRepository,
      private readonly successCallback: SuccessCallback,
      private readonly errorCallback: ErrorCallback
    ) {}
  
  
    public async execute( url: string ): Promise<boolean> {
  
      try {
        const req = await fetch( url );
        if ( !req.ok ) {
          throw new Error( `Error on check service ${ url }` );
        }
        
        const log = new LogEntity({

          message: `Service ${url} working`,
          level: SecurityLevel.low,
          createdAt: new Date(),
          origin: 'check-service.ts'
        })

        this.logRepository.saveLog(log)

        this.successCallback();

        return true;

      } catch (error) {
        
        console.log(`${ error }`);
        
        const errorMessage = `${ error }`

        const log = new LogEntity({
          message: errorMessage,
          level: SecurityLevel.high,
          createdAt: new Date(),
          origin: 'check-service.ts'
        })
        
        this.logRepository.saveLog(log)

        this.errorCallback( `${ error }` );

        return false;
      }
  
    }
  
  }