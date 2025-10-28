//? A use case(caso de uso) is a code that is for one task or a group of tasks

import { LogEntity, LogSeverityLevel } from '../../entities/log.entity.js';
import type { LogRepository } from '../../repository/log.repository.js';

interface CheckServiceProps {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: Error) => void) | undefined;

//! aqui la inyeccion de dependencias se hace a traves de los callbacks en el constructor
export class CheckService implements CheckServiceProps {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    console.log('CheckService is running');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL ${response.status} : ${url}`);
      }
      const log = new LogEntity(
        `SERVICE: URL ${url} is ok`,
        LogSeverityLevel.low
      );
      await this.logRepository.saveLog(log);
      //here we validate if the successCallback is defined and then we call it with the && operator
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const log = new LogEntity(
        `SERVICE: URL ${url} is not ok - TypeError: ${error}`,
        LogSeverityLevel.high
      );
      await this.logRepository.saveLog(log);
      //here we validate if the errorCallback is defined and then we call it with the ? operator
      this.errorCallback?.(error as Error);
      return false;
    }
  }
}
