import { Service } from 'typedi';
import mongoose from 'mongoose';
import { IRepoResponse } from '../CustomTypes/SharedTypes';
import SettingsModel from '../Schemas/Settings';

@Service()
export class SettingsRepository {
	constructor() {}

	/**
	 * @description Fetchs settings
	 * @returns settings data
	 */
	public async fetchSettings(): Promise<IRepoResponse<any>> {
		try {
			let response: IRepoResponse<any> = {} as IRepoResponse<any>;

			const result = await SettingsModel.find({}).lean();

			response.response = result;
			return response;
		} catch (error: any) {
			throw new Error(error);
		}
	}

	/**
	 * @description updates the number_of_attempts in the document
	 * @param id @description _id of the document
	 * @param numberOfAttempts @description number of attempts to be allowed @type number
	 * @returns response
	 */
	public async updateNumberOfattempts(
		id: string,
		numberOfAttempts: number
	): Promise<IRepoResponse<any>> {
		try {
            console.log(mongoose.Types.ObjectId.isValid(id));
			let response: IRepoResponse<any> = {} as IRepoResponse<any>;

			const result = await SettingsModel.findByIdAndUpdate(id, {number_of_attempts: numberOfAttempts}).lean();

			response.response = result;
			return response;
		} catch (error: any) {
            console.log(error)
			throw new Error(error);
		}
	}

    /**
	 * @description updates the candidates list in the document
	 * @param id @description _id of the document
	 * @param candidates @description array of strings as candidates list
	 * @returns response
	 */
	public async updateCandidates(
		id: string,
		candidates: string[]
	): Promise<IRepoResponse<any>> {
		try {
			let response: IRepoResponse<any> = {} as IRepoResponse<any>;

			const result = await SettingsModel.findByIdAndUpdate(id, {candidates}).lean();

			response.response = result;
			return response;
		} catch (error: any) {
			throw new Error(error);
		}
	}

    /**
	 * @description updates the answer by randomly selected candidate from candidate list
	 * @param id @description _id of the document
	 * @param answer @description one of the randomly selected candidate from candidates list @type string 
	 * @returns response
	 */
    public async updateAnswer(
		id: string,
		answer: string
	): Promise<IRepoResponse<any>> {
		try {
			let response: IRepoResponse<any> = {} as IRepoResponse<any>;

			const result = await SettingsModel.findByIdAndUpdate(id, {answer}).lean();

			response.response = result;
			return response;
		} catch (error: any) {
			throw new Error(error);
		}
	}

    /**
	 * @description Fetchs settings by using id of the document
     * @param id @type id
	 * @returns settings data
	 */
    public async fetchSettingsById(id: string): Promise<IRepoResponse<any>> {
		try {
			let response: IRepoResponse<any> = {} as IRepoResponse<any>;

			const result = await SettingsModel.findById(id).lean();

			response.response = result;
			return response;
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

export default SettingsRepository;
