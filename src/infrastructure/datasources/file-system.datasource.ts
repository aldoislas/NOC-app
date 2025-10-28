import fs from 'fs';
import { LogDatasource } from '../../domain/datasources/log.datasource.js';
import {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entity.js';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPath: string = 'logs/logs-all.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium.log';
  private readonly highLogsPath: string = 'logs/logs-high.log';

  constructor() {
    this.ensureDirExists(this.logPath);
    this.ensureDirExists(this.allLogsPath);
    this.ensureDirExists(this.mediumLogsPath);
    this.ensureDirExists(this.highLogsPath);
  }

  private ensureDirExists(dir: string) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directory ${dir} created`);
      }

      [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
        (path) => {
          if (!fs.existsSync(path)) {
            fs.writeFileSync(path, '');
            console.log(`File ${path} created`);
          }
        }
      );
    } catch (error) {
      console.error(error);
      throw new Error(`Error ensuring directory ${dir} exists`);
    }
  }

  saveLog(log: LogEntity): Promise<void> {
    const logString = `Service:${log.message} - Level: ${
      log.level
    } - CreatedAt:${log.createdAt.toISOString()}\n`;

    fs.appendFileSync(this.allLogsPath, logString);

    if (log.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logString);
    } else if (log.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, logString);
    }

    return Promise.resolve();
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf8');
    const logs = content.split('\n').map((line) => LogEntity.fromJson(line));
    return logs;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error('Invalid severity level not found');
    }
  }
}
