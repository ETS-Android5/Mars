import * as RN from 'react-native'
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
export interface LeftRightStyle<T> {
  left: T
  right: T
}
type renderFunction = () => JSX.Element
export interface User {
  _id: any
  name?: string
  avatar?: string | renderFunction
}

export interface Reply {
  title: string
  value: string
}

export interface QuickReplies {
  type: 'radio' | 'checkbox'
  values: Reply[]
}

export interface IMessage {
  _id: any
  text: string
@@ -25,6 +35,7 @@ export interface IMessage {
  sent?: boolean
  received?: boolean
  pending?: boolean
  quickReplies?: QuickReplies
}

export type IChatMessage = IMessage