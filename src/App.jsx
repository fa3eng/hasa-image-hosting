import React, {Suspense, lazy} from 'react'
import { Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import './App.css'

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));


export default function App() {
    return (
        <React.Fragment>

            <Header/>
            <main>
                <Suspense fallback={<Loading />} >
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/history" component={History} />
                        <Route path="/about"  component={About} />
                        <Route path="/login"  component={Login} />
                        <Route path="/register"  component={Register} />
                    </Switch>
                </Suspense>
            </main> 
            <div className="test"></div>
            <Footer/>

        </React.Fragment>
    )
}