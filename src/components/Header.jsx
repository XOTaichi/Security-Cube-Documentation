import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        Security Cube
      </div>
      <nav className="navigation">
        <nav className="navigation">
          <a href="#paper">Paper</a>
          <a href="#code">Code</a>
          <a href="#artifact">Artifact</a>
        </nav>

      </nav>
    </header>
  );
}

export default Header;