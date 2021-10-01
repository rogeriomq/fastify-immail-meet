type IResolveReturn = [
  null | Error,
  null | Promise<any> | Promise<boolean> | string
]

export default (promise: Promise<any>): Promise<IResolveReturn | any> =>
  promise.then(result => [null, result]).catch(error => [error])
