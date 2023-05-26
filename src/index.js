/* global chrome */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';

function init() {
    const appContainer = document.createElement('div');
    appContainer.id = 'butlerRoot';

    if (!chrome.storage) {
        throw new Error('Chrome API is not supported');
    }

    if (!appContainer) {
        throw new Error('Container not created');
    }

    document.body.appendChild(appContainer);

    const root = ReactDOM.createRoot(appContainer);
    root.render(<App/>);
}

init();
