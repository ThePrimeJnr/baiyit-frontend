"use client"

import { useState, useEffect, useCallback } from 'react'
import { mockConversation, mockProducts } from '@/lib/mock-data'
import { Product } from '@/lib/types'
import { generateId } from '@/lib/utils'

export type MessageType = {
  id: string
  sender: 'user' | 'system'
  text: string
  timestamp: string
}

export function useConciergeChat() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeRecommendations, setActiveRecommendations] = useState<Product[]>([])
  
  // Initialize with mock data
  useEffect(() => {
    const storedMessages = localStorage.getItem('chat-messages')
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    } else {
      // Use mock conversation for demo
      setMessages(mockConversation as MessageType[])
      setActiveRecommendations([mockProducts[0], mockProducts[1]])
    }
  }, [])
  
  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-messages', JSON.stringify(messages))
    }
  }, [messages])
  
  // Send a message and get AI response
  const sendMessage = useCallback((text: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: generateId(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    
    // Simulate AI response
    setTimeout(() => {
      // Generate relevant product recommendations based on user message
      let relevantProducts: Product[] = []
      
      const normalizedMessage = text.toLowerCase()
      if (normalizedMessage.includes('headphone') || normalizedMessage.includes('audio')) {
        relevantProducts = [mockProducts[0], mockProducts[5]]
      } else if (normalizedMessage.includes('tv') || normalizedMessage.includes('television')) {
        relevantProducts = [mockProducts[3]]
      } else if (normalizedMessage.includes('fitness') || normalizedMessage.includes('watch')) {
        relevantProducts = [mockProducts[1]]
      } else if (normalizedMessage.includes('chair') || normalizedMessage.includes('office')) {
        relevantProducts = [mockProducts[2]]
      } else if (normalizedMessage.includes('coffee') || normalizedMessage.includes('kitchen')) {
        relevantProducts = [mockProducts[4]]
      } else if (normalizedMessage.includes('speaker') || normalizedMessage.includes('music')) {
        relevantProducts = [mockProducts[5]]
      } else {
        // Return a random selection of products
        const randomProducts = [...mockProducts]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
        
        relevantProducts = randomProducts
      }
      
      setActiveRecommendations(relevantProducts)
      
      // Generate AI response based on user message
      let aiResponse = ''
      
      if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
        aiResponse = "Hello! I'm your AI shopping concierge. How can I help you find the perfect product today?"
      } else if (normalizedMessage.includes('headphone')) {
        aiResponse = "I've found some excellent headphones for you! The Premium Wireless Headphones offer exceptional noise cancellation with a 30-hour battery life. They're currently on sale for $249.99. Would you like to see more details or explore other options?"
      } else if (normalizedMessage.includes('tv')) {
        aiResponse = "Looking for a new TV? I recommend the Ultra HD Smart TV with its stunning 65-inch 4K display. It has built-in streaming apps and HDR technology for vibrant colors. It's currently priced at $749.99, down from $899.99. Would you like more information about this model?"
      } else if (normalizedMessage.includes('fitness') || normalizedMessage.includes('watch')) {
        aiResponse = "For fitness tracking, the Smart Fitness Watch is an excellent choice. It monitors your heart rate, tracks sleep, has built-in GPS, and is water-resistant to 50m. At $179.95, it offers great value. Would you like to see more details?"
      } else if (normalizedMessage.includes('speaker') || normalizedMessage.includes('music')) {
        aiResponse = "For portable music, I recommend the Portable Bluetooth Speaker. It's waterproof, has a 12-hour battery life, and delivers rich sound in a compact design. Currently on sale for $89.99. Would you like to learn more about its features?"
      } else {
        aiResponse = "Based on what you're looking for, I've found some great options that might interest you. Take a look at the recommendations panel to see products I've selected for you. Would you like more details about any specific item?"
      }
      
      const systemMessage: MessageType = {
        id: generateId(),
        sender: 'system',
        text: aiResponse,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, systemMessage])
      setIsLoading(false)
    }, 1500)
  }, [])
  
  return {
    messages,
    isLoading,
    sendMessage,
    activeRecommendations
  }
}