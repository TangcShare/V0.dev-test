"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Send, Phone, Video, MoreVertical, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Contact, Message } from "@/types/chat"
import { formatMessageTime } from "@/lib/utils"
import TypingIndicator from "./typing-indicator"

interface ChatWindowProps {
  contact: Contact
  messages: Message[]
  onSendMessage: (text: string) => void
  isTyping?: boolean
  userAvatar?: string
}

// 头像组件，带有错误处理
const Avatar = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <div className={`${className} bg-gray-200 flex items-center justify-center overflow-hidden`}>
      {!imageError ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <User className="w-1/2 h-1/2 text-gray-400" />
      )}
    </div>
  )
}

export default function ChatWindow({
  contact,
  messages,
  onSendMessage,
  isTyping = false,
  userAvatar = "",
}: ChatWindowProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputRef.current && inputRef.current.value) {
      onSendMessage(inputRef.current.value)
      inputRef.current.value = ""
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* 聊天头部 */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
            />
          </div>
          <div>
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-xs text-gray-500">{contact.status === "online" ? "在线" : "离线"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"} items-end gap-2`}
            >
              {/* 对方头像 */}
              {message.senderId !== "me" && (
                <Avatar src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full" />
              )}

              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === "me"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border"
                }`}
              >
                <p>{message.text}</p>
                <div className={`text-xs mt-1 ${message.senderId === "me" ? "text-blue-100" : "text-gray-500"}`}>
                  {formatMessageTime(message.timestamp)}
                </div>
              </div>

              {/* 用户头像 */}
              {message.senderId === "me" && userAvatar && (
                <Avatar src={userAvatar} alt="我" className="w-8 h-8 rounded-full" />
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start items-end gap-2">
              <Avatar src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full" />
              <div className="bg-white rounded-lg rounded-bl-none border p-2">
                <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-2">
        <Input ref={inputRef} placeholder="输入消息..." className="flex-1" />
        <Button type="submit">
          <Send className="h-4 w-4 mr-2" />
          发送
        </Button>
      </form>
    </div>
  )
}
