import { ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface DocTabsProps {
  tabs: Tab[];
}

export const DocTabs = ({ tabs }: DocTabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="flex border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-trigger ${
              activeTab === tab.id ? "tab-trigger-active" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="animate-fade-in">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
