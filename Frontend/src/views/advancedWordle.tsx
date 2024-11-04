import { useEffect } from 'react';
import '../assets/css/main.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import WordleRow from '../components/wordleRow';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    fetchAttemptsExpiredAttributeFromStore,
    fetchClassValueDataFromStore,
    fetchDataFromStore,
    fetchIdDataFromStore,
    fetchNumberOfattemptsFromStore,
    fetchPerfectMatchAttributeFromStore,
} from '../redux/slices/contents';
import { clearAnswerApi } from '../services/settings';
import { ORIGIN } from '../constants/shared';

/**
 * @description renders the absurdle game page, with input boxes to guess the word and instructions
 */
function AdvancedWordle() {
    const navigate = useNavigate();
    const id = useSelector(fetchIdDataFromStore);
    const numberOfAttempts = useSelector(fetchNumberOfattemptsFromStore);
    const data = useSelector(fetchDataFromStore);
    const classValueData = useSelector(fetchClassValueDataFromStore);
    const perfectMatch = useSelector(fetchPerfectMatchAttributeFromStore);
    const attemptsExpired = useSelector(fetchAttemptsExpiredAttributeFromStore);

    useEffect(() => {
        if (perfectMatch || attemptsExpired) {
            setTimeout(() => {
                if (!!id) {
                    const response = clearAnswerApi({ id });
                    navigate('/options');
                }
            }, 5000);
        }
    }, [perfectMatch, attemptsExpired]);

    const wordleBundle = () => {
        const rows = [];
        for (let i = 0; i < numberOfAttempts; i++) {
            rows.push(
                <WordleRow
                    key={i}
                    i={i}
                    dataRow={data[i]}
                    classValueRow={classValueData[i]}
                    origin={ORIGIN.ADVANCED}
                />,
            );
        }
        return rows;
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={4} spacing={1}>
                    <Grid className="wordle-top" size={12}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {perfectMatch && <Alert severity="success">You Won!!!</Alert>}
                            {attemptsExpired && (
                                <Alert severity="error">
                                    All attempts expired, Please try again
                                </Alert>
                            )}
                        </Stack>
                    </Grid>
                    <Grid size={12}>{wordleBundle()}</Grid>
                    <Grid className="wordle-bottom" size={12}>
                        <h2>Instructions</h2>
                        <ul>
                            <li>Player has to enter a five letter word in each attempt.</li>
                            <li>
                                Each alphabet will be colour coded as white, green or yellow upon
                                entering.
                            </li>
                            <li>
                                White colour coded letter means letter is not present in the answer.
                            </li>
                            <li>
                                Green colour coded letter means letter is present in the answer and
                                in exactly same place as in the answer.
                            </li>
                            <li>
                                Yellow colour coded letter means letter is present in the answer but
                                not in the right place as in the answer.
                            </li>
                            <li>
                                Each player will have only specific number of attempts to guess the
                                right answer.
                            </li>
                            <li>After expiration of the number of attempts game will be over.</li>
                        </ul>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default AdvancedWordle;
