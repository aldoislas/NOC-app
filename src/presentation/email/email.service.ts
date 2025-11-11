import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin.js';

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions) {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      console.log('Email sent:', sentInformation);
      return true;
    } catch (error) {
      return false;
    }
  }

  sendEmailWithFileSystemAttachments(options: SendEmailOptions) {
    const { to, subject, htmlBody } = options;

    const attachments: Attachment[] = [
      { filename: 'logs-all.txt', path: 'logs/logs-all.log' },
      { filename: 'logs-medium.txt', path: 'logs/logs-medium.log' },
      { filename: 'logs-high.txt', path: 'logs/logs-high.log' },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
