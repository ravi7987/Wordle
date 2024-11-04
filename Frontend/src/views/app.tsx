import React, { useState, useEffect } from 'react';
import '../assets/css/main.css';
import { Outlet, Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { getSettings } from '../services/settings';

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSettings({}));
    }, []);

    return (
        <>
            <header>
                <div className="container">
                    <Link to="/options" className="heading">
                        <h1>Wordle</h1>
                    </Link>

                    <nav>
                        <ul className="nav-list">
                            <li>
                                <Link to="/settings">Settings</Link>
                            </li>
                            {/* <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li> */}
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <section className="home">
                    <Outlet />
                </section>
            </main>
        </>
    );
}

export default App;
