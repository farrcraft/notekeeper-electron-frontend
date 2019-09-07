const scripts = [];

// Dynamically insert the DLL script in development env in the
// renderer process
if (window.Bridge.env.nodeEnv === 'development') {
  scripts.push('./dist/renderer.dev.js');
} else {
  scripts.push('./dist/renderer.prod.js');
}

document.write(
  scripts.map(script => `<script defer src="${script}"></script>`).join('')
);
