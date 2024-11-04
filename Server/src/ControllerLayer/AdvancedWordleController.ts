import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import AdvancedWordleService from '../ServiceLayer/AdvancedWordleService';
import { IClientResponse } from '../CustomTypes/SharedTypes';
import { StatusCodes } from 'http-status-codes';

@Service()
class AdvancedWordleController {
    constructor(private readonly advancedWordleService: AdvancedWordleService) {}

    /**
     * @name processInputWord
     * @description process the input word with the answer
     */
    processInputWord = async (req: Request, res: Response, next: NextFunction) => {
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
            const { word, rowIndex } = req.body;

            const serviceResponse = await this.advancedWordleService.processInputWord(
                id,
                word,
                rowIndex,
            );

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

export default AdvancedWordleController;
