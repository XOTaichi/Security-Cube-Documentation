// src/components/CodeBlock.jsx

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 导入一个浅色主题，例如 'prism'。如果您想完全自定义，也可以不导入任何主题。
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'; 
// 如果您想使用 vscDarkPlus 但只想改背景，可以导入 vscDarkPlus 并覆盖其背景色

// 按钮的内联样式
const copyButtonStyle = {
  position: 'absolute',
  top: '0.8em',
  right: '0.8em',
  padding: '6px 12px',
  border: '1px solid #ccc', // 浅色背景下边框颜色需要调整
  borderRadius: '6px',
  backgroundColor: '#e0e0e0', // 按钮背景色也调整为浅色
  color: '#333', // 按钮文字颜色调整为深色
  cursor: 'pointer',
  fontSize: '14px',
  opacity: 0.8,
  transition: 'opacity 0.2s',
  zIndex: 1, // 确保按钮在代码块之上
};

// 容器的样式
const containerStyle = {
  position: 'relative',
  maxWidth: '1200px', // 设置一个最大宽度，确保代码块不会过宽
  margin: '0 auto',  // 让它在屏幕上居中显示
};
const CodeBlock = ({ language, codeString }) => {
  const [buttonText, setButtonText] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setButtonText('Copied!');
      setTimeout(() => {
        setButtonText('Copy');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setButtonText('Error');
       setTimeout(() => {
        setButtonText('Copy');
      }, 2000);
    });
  };

  const handleMouseOver = (e) => e.currentTarget.style.opacity = 1;
  const handleMouseOut = (e) => e.currentTarget.style.opacity = 0.8; // 浅色背景下，初始透明度可以稍微高一点

  return (
    <div style={containerStyle}>
      <button 
        style={copyButtonStyle} 
        onClick={handleCopy}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {buttonText}
      </button>
      <SyntaxHighlighter 
        language={language} 
        // 使用一个浅色主题，例如 `prism`
        style={prism} 
        // 覆盖主题的背景色，确保是白色系
        customStyle={{
            paddingTop: '2.5em',
            backgroundColor: '#f8f8f8', // 浅灰色背景，更柔和
            borderRadius: '8px', // 可以增加一些圆角
            border: '1px solid #eee', // 增加一个浅边框
        }}
      >
        {codeString.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;