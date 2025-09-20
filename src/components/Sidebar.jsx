// src/components/Sidebar.jsx

import React from 'react';

// 这是一个递归组件，用于渲染菜单项或可折叠的分组
function MenuItems({ items, mainKey, activeChapter, expandedGroups, onToggleGroup, onSelect, level = 0 }) {
  const { subKey } = activeChapter;

  return (
    <ul className="sub-menu-list" style={{ paddingLeft: `${level * 20}px` }}>
      {items.map((item) => {
        // CASE 1: 这是一个可折叠的分组
        if (item.type === 'group') {
          const groupKey = `${mainKey}/${item.key}`;
          const isExpanded = !!expandedGroups[groupKey];
          return (
            <li key={groupKey} className="sub-group">
              <div
                className={isExpanded ? 'sub-group-title expanded' : 'sub-group-title'}
                onClick={() => onToggleGroup(groupKey)}
              >
                {item.title}
              </div>
              <div className={isExpanded ? "sub-menu expanded" : "sub-menu"}>
                {/* 递归调用，渲染分组内的子项 */}
                <MenuItems
                  items={item.subchapters}
                  mainKey={mainKey}
                  activeChapter={activeChapter}
                  expandedGroups={expandedGroups}
                  onToggleGroup={onToggleGroup}
                  onSelect={onSelect}
                  level={level + 1} // 增加缩进层级
                />
              </div>
            </li>
          );
        }

        // CASE 2: 这是一个普通的链接
        return (
          <li key={item.key}>
            <a
              href="#"
              className={subKey === item.key ? 'sidebar-link active' : 'sidebar-link'}
              onClick={(e) => {
                e.preventDefault();
                onSelect(mainKey, item.key);
              }}
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}


function Sidebar({ index, onSelect, activeChapter, expandedGroups, onToggleGroup }) {
  return (
    <nav className="sidebar">
      {/* 这个包裹 div 仍然是需要的 */}
      <div className="sidebar-scrollable-content">
        {index.map((chapter) => (
          <div key={chapter.key} className="sidebar-chapter">
            <h2>{chapter.mainTitle}</h2>
            <MenuItems
              items={chapter.subchapters}
              mainKey={chapter.key}
              activeChapter={activeChapter}
              expandedGroups={expandedGroups}
              onToggleGroup={onToggleGroup}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;