import React from 'react';
import { useAppDispatch } from '../redux/store';
import { fetchDataFromStore, fetchIdDataFromStore, saveAlphabet } from '../redux/slices/contents';
import { useSelector } from 'react-redux';
import { processInput } from '../services/conventionalWordle';
import { ORIGIN } from '../constants/shared';
import { processAdvancedInput } from '../services/advancedWordle';

type TWordleRow = {
    i: number;
    dataRow: String[] | any[];
    classValueRow: String[];
    origin: String;
};

/**
 * @description renders the wordle game single row input bundle to enter five letters to guess the five letter word
 */
function ConventionalWordle({ i, dataRow, classValueRow, origin }: TWordleRow) {
    const dispatch = useAppDispatch();
    const documentId = useSelector(fetchIdDataFromStore);
    const wordleRow = useSelector(fetchDataFromStore);

    /**
     * @description  adjust focus to next input box once letter in inserted via keyboard input event
     * This method calls method compareAndChangeElementClass to validate the letter in question according to the rules of the game
     * @params event @type react form event
     */
    const shiftFocus = async (event: React.FormEvent<HTMLInputElement>) => {
        const { classList: name, id, value } = event.currentTarget;
        const filteredValue = value.replace(/[^a-zA-Z]/g, '');

        if (!!!filteredValue) {
            return;
        }

        await compareAndChangeElementClass(filteredValue, id);

        const inputs = document.querySelectorAll<HTMLInputElement>(`.${name[1]}`);
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', (e: any) => {
                if (e.key >= 'a' && e.key <= 'z') {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                } else if (e.key === 'Backspace' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    };

    /**
     * @description  method validate the letter in question according to the rules of the game
     * @params data @type string @description letter inserted via keyboard event
     * @params id @type string @description id of the input box in question
     */
    const compareAndChangeElementClass = async (data: string, id: string) => {
        const unparsedId = id.split('-')[1];
        const parsedId = parseInt(unparsedId);
        if (isNaN(parsedId)) {
            console.log('not a number');
            return;
        }

        if (origin === ORIGIN.CONVENTIONAL) {
            try {
                dispatch(
                    processInput({ id: documentId, word: data, index: parsedId - 1, rowIndex: i }),
                );
            } catch (error: any) {
                console.log(error);
            }
        } else if (parsedId - 1 < 4 && origin === ORIGIN.ADVANCED) {
            dispatch(saveAlphabet({ rowIndex: i, columnIndex: parsedId - 1, value: data }));
        } else if (parsedId - 1 === 4 && origin === ORIGIN.ADVANCED) {
            dispatch(saveAlphabet({ rowIndex: i, columnIndex: parsedId - 1, value: data }));
            let row = [...wordleRow[i]];
            row[4] = data;
            dispatch(
                processAdvancedInput({
                    id: documentId,
                    word: row,
                    rowIndex: i,
                }),
            );
        }
    };

    return (
        <>
            <div className="otp-body">
                <div className="otp-container">
                    <input
                        type="text"
                        maxLength={1}
                        className={`otp-input otp-${i} ${classValueRow[0]}`}
                        id="otp-1"
                        onChange={shiftFocus}
                        value={dataRow[0] ?? ''}
                    />
                    <input
                        type="text"
                        maxLength={1}
                        className={`otp-input otp-${i} ${classValueRow[1]}`}
                        id="otp-2"
                        onChange={shiftFocus}
                        value={dataRow[1] ?? ''}
                    />
                    <input
                        type="text"
                        maxLength={1}
                        className={`otp-input otp-${i} ${classValueRow[2]}`}
                        id="otp-3"
                        onChange={shiftFocus}
                        value={dataRow[2] ?? ''}
                    />
                    <input
                        type="text"
                        maxLength={1}
                        className={`otp-input otp-${i} ${classValueRow[3]}`}
                        id="otp-4"
                        onChange={shiftFocus}
                        value={dataRow[3] ?? ''}
                    />
                    <input
                        type="text"
                        maxLength={1}
                        className={`otp-input otp-${i} ${classValueRow[4]}`}
                        id="otp-5"
                        onChange={shiftFocus}
                        value={dataRow[4] ?? ''}
                    />
                </div>
            </div>
        </>
    );
}

export default ConventionalWordle;
