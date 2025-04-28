"use client";

import { ConciergeChat } from "@/components/concierge/concierge-chat";
import { RecommendationsPanel } from "@/components/concierge/recommendations-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConciergeChat } from "@/hooks/use-concierge-chat";
import { AnimatePresence, motion } from "framer-motion";
import { Image as ImageIcon, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ConciergePage() {
  const [activeTab, setActiveTab] = useState("chat");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage, activeRecommendations } =
    useConciergeChat();

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    sendMessage(inputMessage);
    setInputMessage("");
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="min-h-screen pt-16 md:pt-20 pb-0 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Mobile Tabs */}
        <div className="md:hidden border-b">
          <Tabs
            defaultValue="chat"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="container mx-auto px-4">
              <TabsList className="w-full my-2">
                <TabsTrigger value="chat" className="flex-1">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="products" className="flex-1">
                  Products
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        <AnimatePresence mode="wait">
          {(activeTab === "chat" || window.innerWidth >= 768) && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 md:w-1/2 flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]"
            >
              <ConciergeChat
                messages={messages}
                isLoading={isLoading}
                ref={chatContainerRef}
              />

              <div className="p-4 border-t bg-background/80 backdrop-blur-md">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="flex-shrink-0"
                  >
                    <ImageIcon className="h-5 w-5" />
                  </Button>

                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask anything about products..."
                    className="flex-1"
                  />

                  <Button
                    type="submit"
                    size="icon"
                    disabled={inputMessage.trim() === "" || isLoading}
                    className="flex-shrink-0 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {(activeTab === "products" || true) && (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 md:w-1/2 bg-muted/30 h-[calc(100vh-104px)] md:h-[calc(100vh-80px)] overflow-y-auto"
            >
              <RecommendationsPanel products={activeRecommendations} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
