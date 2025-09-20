import React, { useState } from 'react';
import Header from './components/Header'; // 1. 引入 Header 组件
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { chapterIndex } from './data/chapterIndex';
import './App.css';

function App() {
  const [activeChapter, setActiveChapter] = useState({
    mainKey: 'start',
    subKey: 'Introduction',
  });

  const [expandedGroups, setExpandedGroups] = useState({
    'attacker/attack-methods': false,
  });

  const handleToggleGroup = (groupKey) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const handleSelectChapter = (mainKey, subKey) => {
    setActiveChapter({ mainKey, subKey });
  };

  return (
    // 2. 修改整体布局结构
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar
          index={chapterIndex}
          onSelect={handleSelectChapter}
          activeChapter={activeChapter}
          expandedGroups={expandedGroups}
          onToggleGroup={handleToggleGroup}
        />
        <Content chapterKey={activeChapter} />
      </div>
    </div>
  );
}

export default App;
