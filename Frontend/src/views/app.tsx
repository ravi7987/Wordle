import { useEffect } from 'react';
import '../assets/css/main.css';
import { Outlet, Link } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { getSettings } from '../services/settings';

/**
 * @description renders the wordle application page with header and introduction
 */
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
