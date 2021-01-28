import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Skeleton } from 'antd';
import styled from 'styled-components'

import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

const Main = styled.main`
    margin: 20px 35px;
`

export default function App() {
    return (
        <React.Fragment>
            <Header />
            <Main>
                <Suspense fallback={<Skeleton paragraph={{ rows: 5 }} />} >
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/history" component={History} />
                        <Route path="/about" component={About} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </Suspense>
            </Main>
            <Footer />
        </React.Fragment>
    )
}