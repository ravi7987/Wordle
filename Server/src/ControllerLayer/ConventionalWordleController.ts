import { Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import ConventionalWordleService from "../ServiceLayer/ConventionalWordleService";
import { IClientResponse } from "../CustomTypes/SharedTypes";
import { StatusCodes } from "http-status-codes";

@Service()
class ConventionalWordleController {
	constructor(private readonly conventionalWordleService: ConventionalWordleService) {}

	/**
	 * @name processInputCharacter 
	 * @description process the input cahracter with the answer
	 */
	processInputCharacter = async (req: Request, res: Response, next: NextFunction) => {
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
            const { word, index, rowIndex } = req.body;

			const serviceResponse = await this.conventionalWordleService.processInputCharacter(id, word, index, rowIndex);

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
			response.successMsg = 'input successfully processed';
			response.response = serviceResponse.response;
			res.status(StatusCodes.OK).json(response);
			return;
		} catch (error: any) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
		}
	};
}

export default ConventionalWordleController;
