//? A use case(caso de uso) is a code that is for one task or a group of tasks

interface CheckServiceProps {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: Error) => void;

//! aqui la inyeccion de dependencias se hace a traves de los callbacks en el constructor
export class CheckService implements CheckServiceProps {
  constructor(
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
      this.successCallback();

      return true;
    } catch (error) {
      this.errorCallback(error as Error);
      return false;
    }
  }
}
