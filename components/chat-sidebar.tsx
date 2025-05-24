"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Contact } from "@/types/chat"

interface ChatSidebarProps {
  contacts: Contact[]
  activeContactId: string
  onSelectContact: (contact: Contact) => void
}

export default function ChatSidebar({ contacts, activeContactId, onSelectContact }: ChatSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="w-80 border-r bg-white flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索联系人"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${activeContactId === contact.id ? "bg-gray-100" : ""}`}
            onClick={() => onSelectContact(contact)}
          >
            <div className="relative">
              <img src={contact.avatar || "/placeholder.svg"} alt={contact.name} className="w-10 h-10 rounded-full" />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${contact.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
