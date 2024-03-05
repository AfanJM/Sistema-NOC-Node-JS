//adaptando la dependencia de node mailer
import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogEntity, SecurityLevel } from '../../domain/entities/log.entity'

interface sendEmailOptions {

    to: string,
    subject: string,
    htmlBody: string
    attachements: Attachment[]
}

interface Attachment{

    filename?: string,
    path?: string
}

export class emailService {

    
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_EMAIL_KEY,
        }
    });

    //contructor -> inyeccion de dependencia (basicamente llamo un archivo para usarlo)
    constructor( 
         ) {}
    

    //enviamos un correo
    async sendEmail(options: sendEmailOptions): Promise <boolean> {

        const {to, subject, htmlBody, attachements = [] } = options

        try {

            const sentInformation = await this.transporter.sendMail({

                to: to, 
                subject: subject,
                html: htmlBody,
                attachments: attachements
            })

            const log = new LogEntity({

                level: SecurityLevel.low,
                message: `Email sent to ${to}`,
                origin: 'email.Service.ts',
                createdAt: new Date()

            })
            
            return true;

        } catch (error) {

            const log = new LogEntity({

                level: SecurityLevel.high,
                message: `Email not sent to ${to}`,
                origin: 'email.Service.ts',
                createdAt: new Date()

            })

    

            return false;
            
        }
    }

    //enviamos adjuntos
     async sendEmailWithFileSystemLog( to: string | string[] ) {

        const subject = 'Log del servidor'

        const htmlBody = `
            <h1>Log del servidor</h1>
            <p>Este es el log del servidor</p>
            <p>Ver log adjuntos</p>
        `

        const attachements: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log'  },
            { filename: 'logs-high.log', path: './logs/logs-high.log'  },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'  },
        ];
        
       return this.sendEmail({ 
        to: String (to), //a quien se lo vamos a mandar
        subject,  
        attachements, 
        htmlBody })

    }

}