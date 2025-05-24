import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMessageTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()

  // 今天的消息显示时间
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
  }

  // 昨天的消息
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return "昨天"
  }

  // 一周内的消息显示星期几
  const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  const dayDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (dayDiff < 7) {
    return weekDays[date.getDay()]
  }

  // 更早的消息显示日期
  return date.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })
}
