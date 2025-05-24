export interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "offline"
  lastMessage: string
  time: string
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
}
