export type ProfileResponse =
  | {
      success: true
      email: string
      name: string
    }
  | {
      success: false
      statusCode: number
      message: string
    }

export interface ProfileSuccessRes {
  email: string
  name: string
}

export interface ProfileErrRes {
  statusCode: number
  message: string
}
