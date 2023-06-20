import {
  Injectable,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import * as SendGridHelper from '@sendgrid/helpers';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common/common.service';
import { EnvironmentVars } from 'src/common/common.types';
import * as twilio from 'twilio';

export type Masking = 'sendgrid';

export type SendEmailContext = {
  emailSubject: string;
  toEmail: string;
  fromEmail?: string;
  emailContent: string;
  attachmentPath?: string;
  attachmentName?: string;
};

export type EmailResp = {
  status: string;
  errorMessage?: string;
  errorTrace?: string;
};

export type EmailAttachment = {
  content: string;
  filename: string;
  type?: string;
  disposition?: string;
};

export type EmailData = {
  to: string;
  from: string;
  subject: string;
  text: string;
  attachments?: EmailAttachment[];
};

@Injectable()
export class EmailService {
  private fromEmail: string;
  private fileSystem = require('fs');
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(
      this.configService.get<string>(EnvironmentVars.SMTP_SECRET),
    );
    this.fromEmail = this.configService.get<string>(
      EnvironmentVars.SMTP_MAIL_FROM,
    );
  }

  async sendEmail(context: SendEmailContext, masking: Masking) {
    if (masking === 'sendgrid') {
      this.sendSendGridEmail(context);
    }
  }

  async sendSendGridEmail(context: SendEmailContext) {
    context['fromEmail'] = this.fromEmail;
    let emailResp: EmailResp;

    try {
      let message: EmailData = {
        to: context.toEmail,
        from: context.fromEmail,
        subject: context.emailSubject,
        text: context.emailContent,
      };

      if (!!context.attachmentPath) {
        let attachment: string = this.fileSystem
          .readFileSync(context.attachmentPath)
          .toString('base64');

        let emailAttachment: EmailAttachment = {
          content: attachment,
          filename: context.attachmentName,
          type: 'application/pdf',
          disposition: 'attachment',
        };
        message = {
          ...message,
          attachments: [emailAttachment],
        };
      }

      console.log(message);
      await SendGrid.send(message);
      emailResp = { ...emailResp, status: 'Success' };
    } catch (error) {
      emailResp = {
        ...emailResp,
        status: 'Error',
        errorMessage: error.message,
        errorTrace: JSON.stringify(error),
      };
    }

    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.log(emailResp);
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^');
  }

  async sendEscalationEmail(
    patient: string,
    doctor: string,
    orderable: string,
    resultables: { [key: string]: string },
    email_address: string,
    masking: Masking = 'sendgrid',
  ) {
    if (!!email_address) {
      let resultableString = '';
      for (const resultable in resultables) {
        resultableString += `${resultable}: ${resultables[resultable]}\n`;
      }

      console.log(`"${patient}"`);
      let content = `Dear ${doctor},\n\n${patient} has been escalated for ${orderable}. Please check.\n\n${resultableString}\nThank you.\n\nRegards,\nThe Remote Patient Monitoring`;

      const context: SendEmailContext = {
        emailSubject: `${patient} Escalated for ${orderable}`,
        toEmail: email_address,
        emailContent: content,
      };
      return await this.sendEmail(context, masking);
    } else {
      console.log(
        'Email address not provided. Please provide a valid email address to send the email',
      );
    }
  }
}
