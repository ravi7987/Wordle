import { Link } from 'react-router-dom';
import '../assets/css/main.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

/**
 * @description renders introduction page with actions to enter the game
 */
function Options() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <div className="card-container">
                            <div className="card">
                                <div className="card-content">
                                    <h2 className="card-title">Conventional Wordle</h2>
                                    <p className="card-description">
                                        This is a conventional single player wordle where number of
                                        attempts can be configured.
                                    </p>
                                    <Link to="/conventional" className="card-button">
                                        Play
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div className="card-container">
                            <div className="card">
                                <div className="card-content">
                                    <h2 className="card-title">Advanced Wordle</h2>
                                    <p className="card-description">
                                        This is an advanced version of single player wordle, based
                                        upon client-cheat model
                                    </p>
                                    <Link to="/advanced" className="card-button">
                                        Play
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Options;
