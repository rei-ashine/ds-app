import React from 'react'
import ReactDOM from 'react-dom/client'
import DSExamStudyApp from './ds-exam-study-app'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DSExamStudyApp />
    </ErrorBoundary>
  </React.StrictMode>,
)