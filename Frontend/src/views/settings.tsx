import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import '../assets/css/main.css';
import {
    fetchCandidatesListDataFromStore,
    fetchIdDataFromStore,
    fetchNumberOfattemptsFromStore,
} from '../redux/slices/contents';
import { getSettings, updateCandidatesApi, updateNumberOfAttemptsApi } from '../services/settings';
import { useAppDispatch } from '../redux/store';

/**
 * @description renders settings page in the application, provides interface to configure the number of attempts a player is
 * allowed to play the game and candidates list from which one of the word is randomly selected by the server to be answer to
 * the wordle
 */
function Settings() {
    const dispatch = useAppDispatch();

    // data subsciption from store
    const numberOfAttempts = useSelector(fetchNumberOfattemptsFromStore);
    const candidates = useSelector(fetchCandidatesListDataFromStore);
    const id = useSelector(fetchIdDataFromStore);

    // component level property definition
    const [newCandidate, setnewcandidate] = useState('');

    /**
     * @description handles the onChange event fired whenever there is a change in value in input field for changing number of attempts
     * @parameter e @type html input element event
     */
    const onChangeNumberOfAttempts = async (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        // const response = await updateNumberOfAttempts({ id: id, numberOfAttempts: value });
        try {
            const response = await updateNumberOfAttemptsApi({ id: id, numberOfAttempts: value });
            if (response.data.success) {
                dispatch(getSettings({}));
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    /**
     * @description handles the onChange event fired whenever there is a change in value in input field for adding new candidate
     * validates the input value for length i.e. should be five letter word only
     * @parameter e @type html input element event
     */
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        if (!!value.trim() && value.split('').length === 5) {
            setnewcandidate(value);
        }
        console.log(value);
    };

    /**
     * @description handles the onClick event whenever button is clicked to add new candidate
     * validates if newCandidate property is empty or not
     */
    const addNewCandidate = async () => {
        if (!!!newCandidate.trim()) {
            return;
        }

        let candidatesList: string[] = [...candidates, newCandidate];

        try {
            const response = await updateCandidatesApi({
                id: id,
                candidates: candidatesList,
            });
            if (response.data.success) {
                dispatch(getSettings({}));
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    /**
     * @description handles the onClick event in case of button click for removing candidate from the candidate list
     * @parameter candidate @type string @description candidate from candidate list to be removed from the list and calls
     * relevent functions to persist the changes in the store as well as in the persistant storage via the server
     */
    const removeCandidate = async (candidate: string) => {
        let candidatesList: string[] = [...candidates];
        const index = candidatesList.indexOf(candidate);
        if (index > -1) {
            candidatesList.splice(index, 1);
            try {
                const response = await updateCandidatesApi({
                    id: id,
                    candidates: candidatesList,
                });
                if (response.data.success) {
                    dispatch(getSettings({}));
                }
            } catch (error: any) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container rowSpacing={4} spacing={1}>
                    <Grid className="attributes-container" size={12}>
                        <Grid container rowSpacing={4} spacing={2}>
                            <Grid size={4} className="attributes">
                                Number Of Attempts
                            </Grid>
                            <Grid size={8}>
                                <Grid container rowSpacing={4} spacing={2}>
                                    <Grid size={6}>
                                        <input
                                            type="number"
                                            maxLength={5}
                                            className="input-box"
                                            id="numberOfAttempts"
                                            value={numberOfAttempts}
                                            onChange={onChangeNumberOfAttempts}
                                            // value={dataRow[0] ?? ''}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="attributes-container" size={12}>
                        <Grid container rowSpacing={4} spacing={2}>
                            <Grid size={4} className="attributes">
                                Candidates List
                            </Grid>
                            <Grid size={8}>
                                <Grid container rowSpacing={4} spacing={1}>
                                    <Grid size={12}>
                                        <Grid container rowSpacing={4} spacing={2}>
                                            <Grid size={6}>
                                                <input
                                                    type="text"
                                                    maxLength={5}
                                                    className="input-box"
                                                    id="new-candidate"
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid size={6}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={addNewCandidate}
                                                >
                                                    Add
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid size={6}>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Candidates</TableCell>
                                                        <TableCell align="right">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {candidates.map((candidate) => (
                                                        <TableRow
                                                            key={candidate}
                                                            sx={{
                                                                '&:last-child td, &:last-child th':
                                                                    { border: 0 },
                                                            }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                {candidate}
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Button
                                                                    variant="outlined"
                                                                    onClick={() =>
                                                                        removeCandidate(candidate)
                                                                    }
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default Settings;
