"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Camera, PhoneCall, SendHorizontal } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { useTypewriter } from "react-simple-typewriter";

export default function ChatInput() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const slogans = [
    "Describe your dream gadget...",
    "Snap a pic and Bayit shops it for you...",
    "Tell Bayit what you need...",
    "AI-curated deals, just for you...",
    "Skip browsing, start shopping...",
    "Find the best deal instantly...",
  ];

  const [placeholder] = useTypewriter({
    words: slogans,
    loop: 0,
    typeSpeed: 50,
    deleteSpeed: 20,
    delaySpeed: 3000,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    setIsLoading(true);
    setInputValue("");
    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center p-4 bg-transparent">
      <motion.div
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <form onSubmit={handleSubmit} className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className="h-14 rounded-2xl pl-4 pr-20 text-lg border-secondary-foreground/70"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="absolute right-2 top-2 flex items-center gap-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="rounded-full"
              disabled={true}
            >
              <Camera className="h-5 w-5" />
            </Button>
            {inputValue.trim() ? (
              <Button
                type="submit"
                size="icon"
                variant="secondary"
                disabled={isLoading}
                className="rounded-full"
              >
                <SendHorizontal className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="rounded-full"
                disabled={true}
              >
                <PhoneCall className="h-5 w-5" />
              </Button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
