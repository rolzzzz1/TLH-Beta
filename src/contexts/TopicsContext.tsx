import React, { createContext, useContext, useState, ReactNode } from 'react';

type TopicsContextType = {
  selectedTopics: string[];
  setSelectedTopics: (topics: string[]) => void;
};

export const TopicsContext = createContext<TopicsContextType>({
  selectedTopics: [],
  setSelectedTopics: () => {},
});

export const useTopics = () => useContext(TopicsContext);

type TopicsProviderProps = {
  children: ReactNode;
};

export const TopicsProvider: React.FC<TopicsProviderProps> = ({ children }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  return (
    <TopicsContext.Provider value={{ selectedTopics, setSelectedTopics }}>
      {children}
    </TopicsContext.Provider>
  );
}; 