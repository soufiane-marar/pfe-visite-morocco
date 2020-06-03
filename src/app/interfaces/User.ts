export interface User {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  username: string,
  password?: string,
  role_id: number
}
