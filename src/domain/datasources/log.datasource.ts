//* Abstract class it means that the class is not implemented or you cant instantiate it,
//! const logDS = new LogDatasource(); //* This will throw an error
//* but you can create a class that implements the abstract class
//* and then instantiate it
//* const logDS = new LogDatasourceImpl();
//* logDS.log('Hello, world!');
//* logDS.error('Error, world!');

import { LogEntity, LogSeverityLevel } from '../entities/log.entity.js';

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
