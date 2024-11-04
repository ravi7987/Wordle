import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getSettings } from '../../services/settings';
import { processInput } from '../../services/conventionalWordle';
import { CLASS_VALUES, VERDICT_ON_COMPARISON_OPTIONS } from '../../constants/shared';

/*
 * Slice houses the initial state for the store (subject to the said module for ex. this sample slice is responsible for
 * initial state, which describes portion of the store initial state
 * createSlice function initialize the initial state, reducres (if any) and extra reducres (used for handling async thunks declared in the services)
 */

const initialState = {
    attempts: 5,
    data: [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ],
    classValueData: [
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white"]
    ],
    id: "",
    candidates: [""],
    perfectMatch: false,
    attemptsExpired: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveAlphabet: (state, action: PayloadAction<any>) => {
            const savedData: string[][] = JSON.parse(JSON.stringify(state.data));
            savedData[action.payload.rowIndex][action.payload.columnIndex] = action.payload.value;
            state.data = JSON.parse(JSON.stringify(savedData));
            return state;
        },
        saveElementClass: (state, action: PayloadAction<any>) => {
            const savedData: string[][] = JSON.parse(JSON.stringify(state.classValueData));
            savedData[action.payload.rowIndex][action.payload.columnIndex] = action.payload.value;
            state.classValueData = JSON.parse(JSON.stringify(savedData));
            return state;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getSettings.fulfilled, (state, action) => {
            if(action.payload.data.success) {

                const {number_of_attempts, candidates, _id} = action.payload.data.response;
                state = {...state, id: _id};
                let initialValueRow = ["", "", "", "", ""];
                let initialClassValueRow = ["white", "white", "white", "white", "white"];
                let intialValueArray = [];
                let initialClassValueArray = [];
                for(let i = 1; i <= number_of_attempts; i++) {
                    initialClassValueArray.push(initialClassValueRow);
                    intialValueArray.push(initialValueRow);
                }
                state = {...state, data: intialValueArray, classValueData: initialClassValueArray, candidates: candidates, attempts: number_of_attempts, perfectMatch: false, attemptsExpired: false};
                return state;
            }
        })
        .addCase(processInput.fulfilled, (state, action) => {
            if(action.payload.data.success) {
                const {word, index, rowIndex, verdict} = action.payload.data.response.data;

                switch(verdict) {
                    case (VERDICT_ON_COMPARISON_OPTIONS.PERFECT_MATCH) : {
                        const savedClassValueData: string[][] = JSON.parse(JSON.stringify(state.classValueData));
                        const savedData: string[][] = JSON.parse(JSON.stringify(state.data));
                        savedData[rowIndex][index] = word;
                        savedClassValueData[rowIndex][index] = CLASS_VALUES.GREEN;
                        state = {...state, data: savedData, classValueData:  savedClassValueData}
                        break;
                    }
                    case (VERDICT_ON_COMPARISON_OPTIONS.NOT_IN_RIGHT_PLACE) : {
                        const savedClassValueData: string[][] = JSON.parse(JSON.stringify(state.classValueData));
                        const savedData: string[][] = JSON.parse(JSON.stringify(state.data));
                        savedData[rowIndex][index] = word;
                        savedClassValueData[rowIndex][index] = CLASS_VALUES.YELLOW;
                        state = {...state, data: savedData, classValueData:  savedClassValueData}
                        break;
                    }
                    case (VERDICT_ON_COMPARISON_OPTIONS.NOT_PRESENT) : {
                        const savedData: string[][] = JSON.parse(JSON.stringify(state.data));
                        savedData[rowIndex][index] = word;
                        state = {...state, data: savedData}
                        break;
                    }
                }

                if(index === 4) {
                    let verdict = true;
                    const savedClassValueData: string[][] = JSON.parse(JSON.stringify(state.classValueData));
                    savedClassValueData[rowIndex].forEach((element: string) => {
                        if(element !== CLASS_VALUES.GREEN) {
                            verdict = false;
                        }
                    });

                    if (verdict) {
                        state = {...state, perfectMatch: true}
                    } else if (!verdict && rowIndex === state.attempts - 1) {
                        state = {...state, attemptsExpired: true}
                    }
                }

                return state;
            }
        })
    },
});

export const fetchNumberOfattemptsFromStore = createSelector(
    [(state: RootState) => state.contents],
    (content) => content.attempts,
);

export const fetchDataFromStore = createSelector(
    [(state: RootState) => state.contents],
    (content) => content.data,
);

export const fetchClassValueDataFromStore = createSelector(
    [(state: RootState) => state.contents],
    (content) => content.classValueData
);

export const fetchIdDataFromStore = createSelector(
    [(state: RootState) => state.contents],
    (content) => content.id
);

export const fetchCandidatesListDataFromStore = createSelector(
    [(state: RootState) => state.contents],
    (content) => content.candidates
);

export const fetchPerfectMatchAttributeFromStore = createSelector(
    [(state: RootState) => state.contents],
    (content) => content.perfectMatch
);

export const fetchAttemptsExpiredAttributeFromStore = createSelector(
    [(state: RootState) => state.contents],
    (content) => content.attemptsExpired
);

export const { saveAlphabet, saveElementClass } = userSlice.actions;

export default userSlice.reducer;
