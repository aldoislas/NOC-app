import type { LogRepository } from '../../domain/repository/log.repository.js';
import type { LogDatasource } from '../../domain/datasources/log.datasource.js';
import type {
  LogEntity,
  LogSeverityLevel,
} from '../../domain/entities/log.entity.js';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
