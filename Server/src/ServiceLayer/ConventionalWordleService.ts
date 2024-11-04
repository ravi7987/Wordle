import { Service } from "typedi";
import { IRepoResponse, IServiceResponse } from "../CustomTypes/SharedTypes";
import SettingsRepository from "../RepositoryLayer/SettingsRepository";
import { VERDICT_ON_COMPARISON_OPTIONS } from "../Constants/Shared";

@Service()
class ConventionalWordleService {
	constructor(private readonly settingsRepository: SettingsRepository) {}

	/**
	 * @description process the input cahracter with the answer
     * @param id @description _id of the document
     * @param word @description input character from client @type string
     * @param index @description index of the input character in wordle row input at client side @type number
	 * @returns response object with data @description verdict: string which symbolizes the comparison result of the word 
     * with character at same index in the answer
	 */
    public async processInputCharacter(id: string, word: string, index: number, rowIndex: number): Promise<IServiceResponse<any>> {
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
                index: index,
                rowIndex: rowIndex,
                verdict: VERDICT_ON_COMPARISON_OPTIONS.NOT_PRESENT
            }

			queryResult = await this.settingsRepository.fetchSettingsById(id);
			if (!!!queryResult || queryResult.response === null) {
				res.errorMessage = 'Unable to process the input';
				return res;
			}

            if(!!!queryResult.response.answer) {
                res.errorMessage = 'Unable to find answer for matching and validating';
				return res;
            }

            if(word.trim().split("").length !== 1) {
                res.errorMessage = 'More than one character will not be processed';
				return res;
            }

            const answerArray = queryResult.response.answer.split("");
            if(answerArray[index] === word.trim()) {
                data.verdict = VERDICT_ON_COMPARISON_OPTIONS.PERFECT_MATCH;
            } else if (answerArray.includes(word.trim())) {
                data.verdict = VERDICT_ON_COMPARISON_OPTIONS.NOT_IN_RIGHT_PLACE;
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

export default ConventionalWordleService;
