"use client"

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User, Bot } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { MessageType } from '@/hooks/use-concierge-chat'

type ConciergeChatProps = {
  messages: MessageType[]
  isLoading: boolean
}

export const ConciergeChat = forwardRef<HTMLDivElement, ConciergeChatProps>(
  ({ messages, isLoading }, ref) => {
    // Group messages by date
    const groupedMessages = messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
      return groups
    }, {} as Record<string, MessageType[]>)

    return (
      <ScrollArea ref={ref} className="flex-1">
        <div className="p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Bot className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">Welcome to Baiyit</h3>
              <p className="text-muted-foreground mb-2 max-w-xs">
                I&apos;m your AI shopping concierge. How can I help you find the perfect product today?
              </p>
              <div className="mt-6 grid grid-cols-1 gap-2 w-full max-w-xs">
                {[
                  "Find me a good laptop for college",
                  "What's the best wireless earbuds under $100?",
                  "I need a gift for my mom who loves gardening",
                  "Show me trending sneakers this season"
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    className="text-left p-3 text-sm rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date} className="space-y-4">
                <div className="text-center">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {date === new Date().toDateString() 
                      ? 'Today' 
                      : date === new Date(Date.now() - 86400000).toDateString()
                      ? 'Yesterday'
                      : date}
                  </span>
                </div>
                
                {dateMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-secondary-foreground" />
                        )}
                      </div>
                      
                      <div>
                        <div 
                          className={`p-3 rounded-2xl ${
                            message.sender === 'user' 
                              ? 'bg-primary text-primary-foreground rounded-tr-none' 
                              : 'bg-muted text-foreground rounded-tl-none'
                          }`}
                        >
                          {message.text}
                        </div>
                        <div className={`mt-1 text-xs text-muted-foreground ${
                          message.sender === 'user' ? 'text-right' : 'text-left'
                        }`}>
                          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))
          )}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-secondary-foreground" />
                </div>
                
                <div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-muted">
                    <span className="typing-indicator">Thinking</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    )
  }
)

ConciergeChat.displayName = 'ConciergeChat'