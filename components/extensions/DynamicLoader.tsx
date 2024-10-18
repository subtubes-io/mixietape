import React, { useState, lazy, Suspense } from 'react';

function DynamicComponentLoader() {
  const [Component, setComponent] =
    useState<React.LazyExoticComponent<any> | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleUploadAndExtract = async () => {
    try {
      // Step 1: Select the tar file using the Electron file dialog
      const filePath = await window.electron.selectFile();
      if (!filePath) {
        setStatus('File selection canceled.');
        return;
      }

      const destination =
        '/Users/edgarmartinez/Code/electron-react-boilerplate/_foo'; // Set the extraction path

      // Step 2: Extract the tar file
      const result = await window.electron.uploadAndExtract(
        filePath,
        destination,
      );
      setStatus(`Extraction completed at: ${result.targetPath}`);

      // Step 3: Dynamically load the component from the extracted path
      const componentPath = `${result.targetPath}/index.js`;

      // Dynamically import the component from the extracted folder
      const dynamicComponent = lazy(
        () => import(/* webpackIgnore: true */ componentPath),
      );
      setComponent(() => dynamicComponent);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleUploadAndExtract}>
        Upload and Extract
      </button>
      <p>{status}</p>

      {/* Render the dynamically loaded component */}
      {Component && (
        <Suspense fallback={<div>Loading component...</div>}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}

export default DynamicComponentLoader;
