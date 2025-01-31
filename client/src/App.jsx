import React from 'react'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout/Layout'
import ModeProvider from './contexts/ModeProvider'
import AxiosInterceptorProvider from './contexts/AxiosInterceptorProvider'
import UserProvider from './contexts/UserProvider'
import ErrorProvider from './contexts/ErrorProvider'

const App = () => {
  return (
    <BrowserRouter>
      <ModeProvider>
        <ErrorProvider>
          <AxiosInterceptorProvider>
            <UserProvider>
              <Layout>
                <Router />
              </Layout>
            </UserProvider>
          </AxiosInterceptorProvider>
        </ErrorProvider>
      </ModeProvider>
    </BrowserRouter>
  )
}

export default App
