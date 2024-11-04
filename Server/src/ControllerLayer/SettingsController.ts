import { Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import SettingsService from "../ServiceLayer/SettingsService";
import { IClientResponse } from '../CustomTypes/SharedTypes';

@Service()
class SettingsController {
	constructor(private readonly settingService: SettingsService) {}

    /**
	 * @name fetchSettings 
	 * @description handles incoming request for fetching settings data
	 */
	fetchSettings = async (req: Request, res: Response, next: NextFunction) => {
		try {
			////////////////////////////////////////////////////////////////////////////////////////////////////
			/* Variables and constants declarations */

			const response: IClientResponse<any> = {
				success: false,
				errorMsg: '',
				successMsg: '',
				response: {},
			};

			const serviceResponse = await this.settingService.fetchSettings();

			if (serviceResponse.internalError) {
				if (serviceResponse.error) {
					response.errorMsg = String(serviceResponse.errorMessage);
					res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
					return;
				}
			}

			if (!serviceResponse.success) {
				response.success = false;
				response.successMsg = serviceResponse.errorMessage;
				response.response = serviceResponse.response;
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
				return;
			}

			response.success = true;
			response.successMsg = 'settings successfully fetched';
			response.response = serviceResponse.response;
			res.status(StatusCodes.OK).json(response);
			return;
		} catch (error: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
		}
	};

    /**
	 * @name patchCandidatesSettings 
	 * @description handles incoming request for updating candidates settings data
	 */
	patchCandidatesSettings = async (req: Request, res: Response, next: NextFunction) => {
		try {
			////////////////////////////////////////////////////////////////////////////////////////////////////
			/* Variables and constants declarations */

			const response: IClientResponse<any> = {
				success: false,
				errorMsg: '',
				successMsg: '',
				response: {},
			};

            const { id } = req.query as { [key: string]: string };
            const { candidates } = req.body;

			const serviceResponse = await this.settingService.patchCandidatesSettings(id, candidates);

			if (serviceResponse.internalError) {
				if (serviceResponse.error) {
					response.errorMsg = String(serviceResponse.errorMessage);
					res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
					return;
				}
			}

			if (!serviceResponse.success) {
				response.success = false;
				response.successMsg = serviceResponse.errorMessage;
				response.response = serviceResponse.response;
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
				return;
			}

			response.success = true;
			response.successMsg = 'candidates list successfully updfated';
			response.response = serviceResponse.response;
			res.status(StatusCodes.OK).json(response);
			return;
		} catch (error: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
		}
	};

    /**
	 * @name patchNumberOfAttemptsSettings 
	 * @description handles incoming request for updating number of attempts settings data
	 */
	patchNumberOfAttemptsSettings = async (req: Request, res: Response, next: NextFunction) => {
		try {
			////////////////////////////////////////////////////////////////////////////////////////////////////
			/* Variables and constants declarations */

			const response: IClientResponse<any> = {
				success: false,
				errorMsg: '',
				successMsg: '',
				response: {},
			};

            const { id } = req.query as { [key: string]: string };
            const { numberOfAttempts } = req.body;

			const serviceResponse = await this.settingService.patchNumberOfAttemptsSettings(id, numberOfAttempts);

			if (serviceResponse.internalError) {
				if (serviceResponse.error) {
					response.errorMsg = String(serviceResponse.errorMessage);
					res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
					return;
				}
			}

			if (!serviceResponse.success) {
				response.success = false;
				response.successMsg = serviceResponse.errorMessage;
				response.response = serviceResponse.response;
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
				return;
			}

			response.success = true;
			response.successMsg = 'number of attempts successfully updated';
			response.response = serviceResponse.response;
			res.status(StatusCodes.OK).json(response);
			return;
		} catch (error: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
		}
	};
}

export default SettingsController;
