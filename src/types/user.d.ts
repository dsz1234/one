export type User =
  | {
      id: number | string
      token: string
      account: string
      mobile: string | number
      avatar: string
    }
  | undefined
