import { CronService } from './cron/cron-service.js';
import { CheckService } from '../domain/use-cases/checks/check-service.js';

import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl.js';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource.js';

//* Inyeccion de dependencias
const FileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class ServerApp {
  //! recordar que un metodo estatico se puede llamar sin instanciar la clase
  //! por ejemplo: ServerApp.start();
  //* si no es estatico, se debe instanciar la clase y luego llamar al metodo
  //* por ejemplo: const server = new ServerApp();
  //* server.start();
  public static start() {
    console.log('Server is running');

    CronService.createJob('*/10 * * * * *', () => {
      const date = new Date();
      console.log('You will see this message every 10 seconds', date);
      const url = 'https://www.google.com/not-found';
      //const url = 'https://www.google.com';
      //const url = 'http://localhost:3000/posts';

      //! example of how not to use the successCallback and errorCallback
      new CheckService(FileSystemLogRepository, undefined, undefined).execute(
        url
      );

      //! example of how to use the successCallback and errorCallback
      // new CheckService(
      //   FileSystemLogRepository,
      //   () => {
      //     console.log(`SUCCESS: URL ${url} is ok`);
      //   },
      //   (error) => {
      //     console.log('Error', error);
      //   }
      // ).execute(url);
    });
  }
}
