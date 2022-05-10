type IResolveReturn = [
  null | Error,
  null | Promise<any> | Promise<boolean> | string
]

export function to (promise: Promise<any>): Promise<IResolveReturn | any> {
  return promise.then(result => [null, result]).catch(error => [error])
}
