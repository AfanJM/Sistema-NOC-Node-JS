//ENTITIES: algo que va a llegar a la base de datos (cliente, producto) quien va a gobernar nuestra aplicacion

export enum SecurityLevel {

    low = 'low',
    mediun = 'mediun',
    high = 'high'
}

//cuando tengas mas de 3 argumentos en un metodo o funcion o constructor, mejor mandarlos como un objeto
export interface LogOptions {

    level: SecurityLevel;
    message: string;
    origin: string; 
    createdAt: Date;
}

export class LogEntity {

    public level: SecurityLevel; // Enum,
    public message: string;
    public createdAt: Date;
    public origin: string; 


    //inicializamos nuestras propiedades de la clase
    constructor(options: LogOptions) {
        const {message, level, origin , createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.origin = origin;
        this.createdAt = createdAt

    }

    //aqui recibimos el log
    static fromJson = (json: string):LogEntity => {

        const {message, level, createdAt, origin} = JSON.parse(json)

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin
        }) 
       
        return log

    }

    //adaptamos el objeto mongo a mi LogEntity
    static fromObject = (object: {[  key: string]: any}): LogEntity => {
        
        const {message, level, origin, createdAt} = object

        const log = new LogEntity({
            message,
            level,
            origin,
            createdAt
        })

        return log


    }


}