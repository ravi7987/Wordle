import { Link } from 'react-router-dom';
import '../assets/css/main.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { clearAnswerApi, getSettings } from '../services/settings';
import { useSelector } from 'react-redux';
import { fetchIdDataFromStore } from '../redux/slices/contents';
import { useAppDispatch } from '../redux/store';

/**
 * @description renders the page, which provides options to choose between game wordle or absurdle
 */
function Options() {
    const id = useSelector(fetchIdDataFromStore);
    const dispatch = useAppDispatch();

    const clearAnswer = async () => {
        if (!!id) {
            const response = await clearAnswerApi({ id });
        }
    };

    const fetchSettings = async () => {
        try {
            dispatch(getSettings({}));
        } catch (error: any) {
            console.log(error);
        }
    };

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
                                    <Link
                                        onClick={fetchSettings}
                                        to="/conventional"
                                        className="card-button"
                                    >
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
                                    <h2 className="card-title">Absurdle</h2>
                                    <p className="card-description">
                                        This is an advanced version of single player wordle, based
                                        upon client-cheat model
                                    </p>
                                    <Link
                                        to="/advanced"
                                        className="card-button"
                                        onClick={clearAnswer}
                                    >
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
