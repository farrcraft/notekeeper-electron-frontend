const scripts = [];

// Dynamically insert the DLL script in development env in the
// renderer process
if (window.Bridge.env.nodeEnv === 'development') {
  scripts.push('../dll/renderer.dev.dll.js');
}

// Dynamically insert the bundled app script in the renderer process
// We don't have access to
const port = window.Bridge.env.port || 1212;
scripts.push(
  window.Bridge.env.hot
    ? `http://localhost:${port}/dist/renderer.dev.js`
    : './dist/renderer.prod.js'
);

document.write(
  scripts.map(script => `<script defer src="${script}"></script>`).join('')
);
