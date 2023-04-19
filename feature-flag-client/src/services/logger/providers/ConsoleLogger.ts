import { LoggerService } from '../logger'

class ConsoleLogger implements LoggerService {
  constructor(private logger = console) {
  }
  log(...data: any[]): void {
    this.logger.log(...data)
  }
  
  error(...data: any[]): void {
    this.logger.error(...data)
  }
}

export default ConsoleLogger
