import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Footer } from './Footer';

export const PageShell = ({
  children,
  title,
  sidebarCollapsed = false,
  noSidebar = false,
  simplifiedTopbar = false,
  showAvatar = true,
  contentMaxWidth
}) => {
  return (
    <div className="app-container">
      {!noSidebar && <Sidebar collapsed={sidebarCollapsed} />}
      <div className="main-wrapper">
        <Topbar
          title={title}
          simplified={simplifiedTopbar}
          showAvatar={showAvatar}
        />
        <main
          className="content-area"
          style={contentMaxWidth ? { maxWidth: contentMaxWidth } : undefined}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};
