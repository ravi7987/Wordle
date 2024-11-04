import { Service } from 'typedi';
import SettingsRepository from '../RepositoryLayer/SettingsRepository';
import { IRepoResponse, IServiceResponse } from '../CustomTypes/SharedTypes';
import { CLASS_VALUES, VERDICT_ON_COMPARISON_OPTIONS } from '../Constants/Shared';
import SettingsService from './SettingsService';

@Service()
class AdvancedWordleService {
    constructor(
        private readonly settingsRepository: SettingsRepository,
        private readonly settingsservice: SettingsService,
    ) {}

    /**
     * @description process the input word with the answer
     * @param id @description _id of the document
     * @param word @description input word from client @type string[]
     * @param rowIndex @description index of the input row at client side @type number
     * @returns response object with data @description verdict: string[] which symbolizes the comparison result of the word
     */
    public async processInputWord(
        id: string,
        word: string[],
        rowIndex: number,
    ): Promise<IServiceResponse<any>> {
        const res: IServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: {},
            success: false,
            error: {} as any,
        };
        try {
            let queryResult: IRepoResponse<any>;
            let data = {
                word: word,
                rowIndex: rowIndex,
                verdict: [
                    VERDICT_ON_COMPARISON_OPTIONS.NOT_PRESENT,
                    VERDICT_ON_COMPARISON_OPTIONS.NOT_PRESENT,
                    VERDICT_ON_COMPARISON_OPTIONS.NOT_PRESENT,
                    VERDICT_ON_COMPARISON_OPTIONS.NOT_PRESENT,
                    VERDICT_ON_COMPARISON_OPTIONS.NOT_PRESENT,
                ],
            };
            let candidates: string[];

            queryResult = await this.settingsRepository.fetchSettingsById(id);
            if (!!!queryResult || queryResult.response === null) {
                res.errorMessage = 'Unable to process the input';
                return res;
            }

            // if final answer is already selected then wordle will work as conventional wordle
            if (queryResult.response.answer && queryResult.response.answer !== '') {
                const answerArray = queryResult.response.answer.split('');
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === answerArray[i]) {
                        data.verdict[i] = VERDICT_ON_COMPARISON_OPTIONS.PERFECT_MATCH;
                    } else if (answerArray.includes(word[i])) {
                        data.verdict[i] = VERDICT_ON_COMPARISON_OPTIONS.NOT_IN_RIGHT_PLACE;
                    }
                }
            } else {
                // if final result is still not decided by the system
                // formulate the valid candidates list, if first word iteration then whole list will be valid
                // otherwise temp list from database document will be valid
                if (rowIndex === 0) {
                    candidates = JSON.parse(JSON.stringify(queryResult.response.candidates));
                } else {
                    candidates = JSON.parse(JSON.stringify(queryResult.response.tempCandidates));
                }

                // calculate scores of each candidate from valid list and store them in map datastructure
                let candidatesMap = new Map<string, number>();
                word.forEach((letter: string) => {
                    candidates.forEach((candidate: string) => {
                        let score = 0;
                        if (candidatesMap.has(candidate)) {
                            score = candidatesMap.get(candidate) ?? 0;
                        }
                        let candidateSplitArray = candidate.split('');
                        if (candidateSplitArray.includes(letter)) {
                            score += 1;
                        }
                        candidatesMap.set(candidate, score);
                    });
                });

                // check if there are any candidates with zero score, if not then select candidate with minimum score
                let candidatesWithZeroScore: string[] = [];
                let minimumScoreCandidate: { key: string; score: number } = {
                    key: '',
                    score: 0,
                };
                for (let [key, value] of candidatesMap) {
                    if (value === 0) {
                        candidatesWithZeroScore.push(key);
                    }
                    if (minimumScoreCandidate.key === '') {
                        minimumScoreCandidate.key = key;
                        minimumScoreCandidate.score = value;
                    } else {
                        if (value < minimumScoreCandidate.score) {
                            minimumScoreCandidate.key = key;
                            minimumScoreCandidate.score = value;
                        }
                    }
                }

                if (candidatesWithZeroScore.length === 0) {
                    // find out minimum score candidates and save that as answer
                    // and formulate the classValue array

                    const answerArray = minimumScoreCandidate.key.split('');
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === answerArray[i]) {
                            data.verdict[i] = VERDICT_ON_COMPARISON_OPTIONS.PERFECT_MATCH;
                        } else if (answerArray.includes(word[i])) {
                            data.verdict[i] = VERDICT_ON_COMPARISON_OPTIONS.NOT_IN_RIGHT_PLACE;
                        }
                    }

                    const saveAnswer = await this.settingsRepository.updateAnswer(
                        id,
                        minimumScoreCandidate.key,
                    );
                    if (!!!saveAnswer || queryResult.response === null) {
                        res.errorMessage = 'Unable to save answer';
                        res.internalError = true;
                        return res;
                    }

                    res.success = true;
                    res.response = { data };
                    return res;
                } else {
                    // save the array to temp and if length is equal to one then save that candidate as key
                    // and formulate the classValue array
                    if (candidatesWithZeroScore.length === 1) {
                        const saveAnswer = await this.settingsRepository.updateAnswer(
                            id,
                            candidatesWithZeroScore[0],
                        );
                        if (!!!saveAnswer || queryResult.response === null) {
                            res.errorMessage = 'Unable to save answer';
                            res.internalError = true;
                            return res;
                        }
                    } else {
                        const savetempList = await this.settingsRepository.updateTempCandidatesList(
                            id,
                            candidatesWithZeroScore,
                        );
                        if (!!!savetempList || savetempList.response === null) {
                            res.errorMessage = 'Unable to save answer';
                            res.internalError = true;
                            return res;
                        }
                    }
                }
            }

            let gameFinished = true;
            data.verdict.forEach((verdict: string) => {
                if (verdict !== VERDICT_ON_COMPARISON_OPTIONS.PERFECT_MATCH) {
                    gameFinished = false;
                }
            });

            // clear answer
            if (rowIndex === queryResult.response.number_of_attempts - 1 || gameFinished) {
                this.settingsservice.clearAnswer(id);
            }

            res.success = true;
            res.response = { data };
            return res;
        } catch (error) {
            res.errorMessage = 'Unable to process the input';
            res.internalError = true;
            return res;
        }
    }
}

export default AdvancedWordleService;
