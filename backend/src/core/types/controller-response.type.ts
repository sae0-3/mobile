export interface ControllerResponse<T> {
  success: boolean,
  statusCode: number,
  data?: T,
  message?: string,
}
