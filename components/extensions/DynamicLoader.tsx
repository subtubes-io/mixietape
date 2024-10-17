import React, { useState, lazy, Suspense } from 'react';

function DynamicComponentLoader() {
  const [Component, setComponent] =
    useState<React.LazyExoticComponent<any> | null>(null);

  const handleLoadComponent = async () => {
    // Use Electron's select file function to get the file path
    const filePath = await window.electron.selectFile();

    if (filePath) {
      // Dynamically import the component from the selected file
      const dynamicComponent = lazy(
        () => import(/* webpackIgnore: true */ filePath),
      );
      setComponent(() => dynamicComponent);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLoadComponent}>
        Load Component
      </button>
      {Component && (
        <Suspense fallback={<div>Loading component...</div>}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}

export default DynamicComponentLoader;
