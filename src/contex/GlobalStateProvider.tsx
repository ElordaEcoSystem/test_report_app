'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Определяем тип для контекста
type GlobalContextType = {
  globalValue: string;
  setGlobalValue: React.Dispatch<React.SetStateAction<string>>;
};

// 2. Создаём контекст с этим типом (может быть null)
const GlobalContext = createContext<GlobalContextType | null>(null);

// 3. Оборачиваем провайдер
export function GlobalProvider({ children }: { children: ReactNode }) {
  const [globalValue, setGlobalValue] = useState("initial");

  return (
    <GlobalContext.Provider value={{ globalValue, setGlobalValue }}>
      {children}
    </GlobalContext.Provider>
  );
}

// 4. Кастомный хук с проверкой на null
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}