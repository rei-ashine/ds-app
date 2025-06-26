import React from 'react'
import ReactDOM from 'react-dom/client'
import DSExamStudyApp from './ds-exam-study-app'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

// Handle GitHub Pages SPA routing
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, '', redirect);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DSExamStudyApp />
    </ErrorBoundary>
  </React.StrictMode>,
)