// src/components/Content.jsx

import React, { lazy, Suspense, useEffect, useState } from 'react';

// A helper function to dynamically import the components
const loadChapter = (mainKey, subKey) => {
  const chapterToLoad = subKey ? subKey : 'Overview';
  return lazy(() => import(`../chapters/${mainKey}/${chapterToLoad}.jsx`));
};

function Content({ chapterKey }) {
  const { mainKey, subKey } = chapterKey;
  const [ChapterComponent, setChapterComponent] = useState(null);

  useEffect(() => {
    if (mainKey) {
      setChapterComponent(loadChapter(mainKey, subKey));
    }
  }, [mainKey, subKey]);

  return (
    <main className="content">
      <div className="content-wrapper">
        <Suspense fallback={
          <div className="loading" aria-busy="true" aria-live="polite">
            <div className="loading-skeleton" role="status">
              <div className="skeleton-title" />
              <div className="skeleton-line" />
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          </div>
        }>
          {ChapterComponent && <ChapterComponent />}
        </Suspense>

      </div>
    </main>
  );
}

export default Content;