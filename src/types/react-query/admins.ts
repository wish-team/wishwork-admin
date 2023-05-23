export interface GetAdmins {
  admins: Admin[]
  totalCount: number
  totalPages: number
}

export interface Admin {
  _id: string
  email: string
  name: string
  createdAt: Date
}
