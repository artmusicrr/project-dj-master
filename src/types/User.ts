export interface IUser {
  name?: string
  token?: string
}

export interface IContext extends IUser {
  authenticate: (name: string, password: string) => Promise<void>
  logout: () => void
}

export interface IAuthProvider {
  children: JSX.Element
}
