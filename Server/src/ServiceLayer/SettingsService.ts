import { Service } from 'typedi';
import { IRepoResponse, IServiceResponse } from '../CustomTypes/SharedTypes';
import SettingsRepository from '../RepositoryLayer/SettingsRepository';

@Service()
class SettingsService {
    constructor(private readonly settingsRepository: SettingsRepository) {}

    /**
     * @description Fetches settings data
     * @returns response object with settings data
     */
    public async fetchSettings(): Promise<IServiceResponse<any>> {
        const res: IServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: {},
            success: false,
            error: {} as any,
        };
        try {
            let queryResult: IRepoResponse<any>;

            queryResult = await this.settingsRepository.fetchSettings();
            if (!!!queryResult || queryResult.response === null) {
                res.errorMessage = 'Unable to fetch settings data';
                res.internalError = true;
                return res;
            }

            const random = Math.floor(
                Math.random() * (queryResult.response[0].number_of_attempts + 1),
            );
            const saveAnswer = await this.settingsRepository.updateAnswer(
                queryResult.response[0]._id,
                queryResult.response[0].candidates[random],
            );
            if (!!!saveAnswer || queryResult.response === null) {
                res.errorMessage = 'Unable to save answer';
                res.internalError = true;
                return res;
            }

            res.success = true;
            res.response = queryResult.response[0];
            return res;
        } catch (error) {
            res.errorMessage = 'Unable to fetch settings data';
            res.internalError = true;
            return res;
        }
    }

    /**
     * @description updates candidatres list in the document
     * @param id @description _id of the document
     * @param candidates @description array of five alphabets words as candidates @type string array
     * @returns response object
     */
    public async patchCandidatesSettings(
        id: string,
        candidates: string[],
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

            queryResult = await this.settingsRepository.updateCandidates(id, candidates);
            if (!!!queryResult || queryResult.response === null) {
                res.errorMessage = 'Unable to update candidates data';
                return res;
            }

            res.success = true;
            res.response = queryResult.response;
            return res;
        } catch (error) {
            res.errorMessage = 'Unable to update candidates data';
            res.internalError = true;
            return res;
        }
    }

    /**
     * @description updates number of attempts allowed
     * @param id @description _id of the document
     * @param numberOfAttempts @description @type number
     * @returns response object
     */
    public async patchNumberOfAttemptsSettings(
        id: string,
        numberOfAttempts: number,
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

            queryResult = await this.settingsRepository.updateNumberOfattempts(
                id,
                numberOfAttempts,
            );

            if (!!!queryResult || queryResult.response === null) {
                res.errorMessage = 'Unable to update number of attempts data';
                return res;
            }

            res.success = true;
            return res;
        } catch (error) {
            res.errorMessage = 'Unable to update number of attempts data';
            res.internalError = true;
            return res;
        }
    }

    /**
     * @description clears answer in the document
     * @param id @description _id of the document
     * @returns response object
     */
    public async clearAnswer(id: string): Promise<IServiceResponse<any>> {
        const res: IServiceResponse<any> = {
            errorMessage: '',
            internalError: false,
            response: {},
            success: false,
            error: {} as any,
        };
        try {
            let queryResult: IRepoResponse<any>;

            queryResult = await this.settingsRepository.updateAnswer(id, '');
            if (!!!queryResult || queryResult.response === null) {
                res.errorMessage = 'Unable to save answer';
                res.internalError = true;
                return res;
            }

            res.success = true;
            res.response = queryResult.response;
            return res;
        } catch (error) {
            res.errorMessage = 'Unable to save answer';
            res.internalError = true;
            return res;
        }
    }
}

export default SettingsService;
