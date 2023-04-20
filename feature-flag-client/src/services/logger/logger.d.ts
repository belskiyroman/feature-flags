export interface LoggerService {
  log(...data: any[]): void
  error(...data: any[]): void
}
