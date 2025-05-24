"use client"

import { useState } from "react"
import ChatSidebar from "@/components/chat-sidebar"
import ChatWindow from "@/components/chat-window"
import type { Contact, Message } from "@/types/chat"

export default function ChatApp() {
  // 初始联系人数据
  const initialContacts: Contact[] = [
    {
      id: "1",
      name: "张三",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "你好，最近怎么样？",
      time: "09:30",
    },
    {
      id: "2",
      name: "李四",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastMessage: "明天会议几点开始？",
      time: "昨天",
    },
    {
      id: "3",
      name: "王五",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "项目进展如何？",
      time: "周一",
    },
    {
      id: "4",
      name: "工作群",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      lastMessage: "[张三]: 文档已更新",
      time: "08:45",
    },
  ]

  // 初始消息数据
  const initialMessages: Record<string, Message[]> = {
    "1": [
      { id: "1", senderId: "1", text: "你好，最近怎么样？", timestamp: new Date(Date.now() - 3600000).toISOString() },
      {
        id: "2",
        senderId: "me",
        text: "挺好的，谢谢关心！你呢？",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      { id: "3", senderId: "1", text: "我也不错，在忙新项目", timestamp: new Date(Date.now() - 3400000).toISOString() },
      {
        id: "4",
        senderId: "me",
        text: "什么项目？听起来很有意思",
        timestamp: new Date(Date.now() - 3300000).toISOString(),
      },
      {
        id: "5",
        senderId: "1",
        text: "是一个电商平台的改版，UI设计已经完成了",
        timestamp: new Date(Date.now() - 3200000).toISOString(),
      },
      {
        id: "6",
        senderId: "1",
        text: "下周我们要开始前端开发",
        timestamp: new Date(Date.now() - 3100000).toISOString(),
      },
      {
        id: "7",
        senderId: "me",
        text: "需要帮忙吗？我最近刚好有空",
        timestamp: new Date(Date.now() - 3000000).toISOString(),
      },
      {
        id: "8",
        senderId: "1",
        text: "太好了！我正想问你呢。明天有时间讨论一下吗？",
        timestamp: new Date(Date.now() - 2900000).toISOString(),
      },
    ],
    "2": [
      { id: "1", senderId: "2", text: "明天会议几点开始？", timestamp: new Date(Date.now() - 86400000).toISOString() },
      {
        id: "2",
        senderId: "me",
        text: "上午10点，在3号会议室",
        timestamp: new Date(Date.now() - 85000000).toISOString(),
      },
      { id: "3", senderId: "2", text: "好的，谢谢提醒", timestamp: new Date(Date.now() - 84000000).toISOString() },
      {
        id: "4",
        senderId: "2",
        text: "对了，你准备好演示文稿了吗？",
        timestamp: new Date(Date.now() - 83000000).toISOString(),
      },
      {
        id: "5",
        senderId: "me",
        text: "已经完成了，刚发到你邮箱",
        timestamp: new Date(Date.now() - 82000000).toISOString(),
      },
      {
        id: "6",
        senderId: "2",
        text: "收到，我看看有没有需要调整的地方",
        timestamp: new Date(Date.now() - 81000000).toISOString(),
      },
    ],
    "3": [
      { id: "1", senderId: "3", text: "项目进展如何？", timestamp: new Date(Date.now() - 259200000).toISOString() },
      {
        id: "2",
        senderId: "me",
        text: "基本按计划进行，后端API已经完成了70%",
        timestamp: new Date(Date.now() - 258000000).toISOString(),
      },
      { id: "3", senderId: "3", text: "前端呢？", timestamp: new Date(Date.now() - 257000000).toISOString() },
      {
        id: "4",
        senderId: "me",
        text: "前端稍微落后，大概完成了50%",
        timestamp: new Date(Date.now() - 256000000).toISOString(),
      },
      { id: "5", senderId: "3", text: "需要增加人手吗？", timestamp: new Date(Date.now() - 255000000).toISOString() },
      {
        id: "6",
        senderId: "me",
        text: "可能需要再增加一名前端开发",
        timestamp: new Date(Date.now() - 254000000).toISOString(),
      },
      { id: "7", senderId: "3", text: "好的，我会安排的", timestamp: new Date(Date.now() - 253000000).toISOString() },
    ],
    "4": [
      { id: "1", senderId: "1", text: "文档已更新", timestamp: new Date(Date.now() - 7200000).toISOString() },
      { id: "2", senderId: "2", text: "谢谢，我看一下", timestamp: new Date(Date.now() - 7100000).toISOString() },
      {
        id: "3",
        senderId: "3",
        text: "有没有更新数据库设计部分？",
        timestamp: new Date(Date.now() - 7000000).toISOString(),
      },
      {
        id: "4",
        senderId: "1",
        text: "是的，主要更新了用户表的结构",
        timestamp: new Date(Date.now() - 6900000).toISOString(),
      },
      {
        id: "5",
        senderId: "me",
        text: "我们需要讨论一下新增的字段",
        timestamp: new Date(Date.now() - 6800000).toISOString(),
      },
      {
        id: "6",
        senderId: "2",
        text: "同意，这些变更会影响到权限系统",
        timestamp: new Date(Date.now() - 6700000).toISOString(),
      },
      {
        id: "7",
        senderId: "1",
        text: "好的，下午3点开个简短的会议讨论一下？",
        timestamp: new Date(Date.now() - 6600000).toISOString(),
      },
      { id: "8", senderId: "3", text: "可以，我有空", timestamp: new Date(Date.now() - 6500000).toISOString() },
      { id: "9", senderId: "me", text: "我也可以参加", timestamp: new Date(Date.now() - 6400000).toISOString() },
    ],
  }

  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages)
  const [activeContact, setActiveContact] = useState<Contact>(contacts[0])
  // 在状态部分添加一个新的状态
  const [isTyping, setIsTyping] = useState(false)

  // 发送新消息
  const simulateReply = (contactId: string, userMessage: string) => {
    // 先显示打字状态
    setIsTyping(true)

    // 延迟1-3秒回复，模拟真实对话
    const delay = Math.floor(Math.random() * 2000) + 1000

    setTimeout(() => {
      // 隐藏打字状态
      setIsTyping(false)

      // 根据不同联系人和消息内容生成不同回复
      let replyText = ""

      if (userMessage.includes("你好") || userMessage.includes("嗨") || userMessage.includes("hi")) {
        replyText = "你好！有什么可以帮到你的吗？"
      } else if (userMessage.includes("谢谢") || userMessage.includes("感谢")) {
        replyText = "不客气，随时为你服务！"
      } else if (userMessage.includes("时间") || userMessage.includes("什么时候")) {
        replyText = "我想我们可以安排在明天下午2点，你觉得如何？"
      } else if (userMessage.includes("项目") || userMessage.includes("工作")) {
        replyText = "项目进展顺利，我们已经完成了大部分功能开发。"
      } else if (userMessage.includes("问题") || userMessage.includes("困难")) {
        replyText = "遇到什么问题了吗？详细说说，也许我能帮上忙。"
      } else if (userMessage.includes("会议") || userMessage.includes("讨论")) {
        replyText = "好的，我已经在日程表上标记了，到时见。"
      } else {
        // 默认回复
        const defaultReplies = [
          "明白了，我会处理的。",
          "好的，没问题。",
          "这个想法不错，我们可以进一步讨论。",
          "我需要再考虑一下这个问题。",
          "谢谢分享，这很有帮助。",
        ]
        replyText = defaultReplies[Math.floor(Math.random() * defaultReplies.length)]
      }

      // 创建新消息
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: contactId,
        text: replyText,
        timestamp: new Date().toISOString(),
      }

      // 更新消息列表
      setMessages((prev) => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), newMessage],
      }))

      // 更新联系人列表中的最后一条消息
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === contactId ? { ...contact, lastMessage: replyText, time: "刚刚" } : contact,
        ),
      )
    }, delay)
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text,
      timestamp: new Date().toISOString(),
    }

    // 更新消息列表
    setMessages((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage],
    }))

    // 更新联系人列表中的最后一条消息
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === activeContact.id ? { ...contact, lastMessage: text, time: "刚刚" } : contact,
      ),
    )

    // 模拟对方回复
    simulateReply(activeContact.id, text)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar
        contacts={contacts}
        activeContactId={activeContact.id}
        onSelectContact={(contact) => setActiveContact(contact)}
      />
      <ChatWindow
        contact={activeContact}
        messages={messages[activeContact.id] || []}
        onSendMessage={sendMessage}
        isTyping={isTyping} // 添加这一行
      />
    </div>
  )
}
