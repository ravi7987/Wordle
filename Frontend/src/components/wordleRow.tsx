import React, { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { fetchIdDataFromStore, fetchNumberOfattemptsFromStore } from '../redux/slices/contents';
import { useSelector } from 'react-redux';
import { processInput } from '../services/conventionalWordle';
import { CLASS_VALUES } from '../constants/shared';

type TWordleRow = {
    i: number;
    dataRow: String[] | any[];
    classValueRow: String[];
};

function ConventionalWordle({ i, dataRow, classValueRow }: TWordleRow) {
    const dispatch = useAppDispatch();
    const documentId = useSelector(fetchIdDataFromStore);
    const numberOfAttempts = useSelector(fetchNumberOfattemptsFromStore);

    //   Method is used to shift focus to the next element if valid character is provided and make
    //  changes to the input background color
    const shiftFocus = async (event: React.FormEvent<HTMLInputElement>) => {
        const { classList: name, id, value } = event.currentTarget;
        const filteredValue = value.replace(/[^a-zA-Z]/g, '');

        if (!!!filteredValue) {
            console.log('return');
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

    const compareAndChangeElementClass = async (data: string, id: string) => {
        const unparsedId = id.split('-')[1];
        const parsedId = parseInt(unparsedId);
        if (isNaN(parsedId)) {
            console.log('not a number');
            return;
        }
        try {
            dispatch(
                processInput({ id: documentId, word: data, index: parsedId - 1, rowIndex: i }),
            );
        } catch (error: any) {
            console.log(error);
        }
        console.log(parsedId);
        if (parsedId - 1 === 4) {
            checkFinalWord(i);
        }
    };

    const checkFinalWord = (rowIndex: number) => {
        let verdict = true;
        classValueRow.forEach((e: String) => {
            if (e !== CLASS_VALUES.GREEN) {
                verdict = false;
            }
        });

        if (verdict) {
            console.log('you win');
        } else if (!verdict && rowIndex === numberOfAttempts - 1) {
            console.log('you loose');
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
