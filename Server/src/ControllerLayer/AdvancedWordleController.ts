import { Service } from "typedi";
import { Request, Response, NextFunction } from "express";
import AdvancedWordleService from "../ServiceLayer/AdvancedWordleService";

@Service()
class AdvancedWordleController {
	constructor(private readonly advancedWordleService: AdvancedWordleService) {}

	public testController = (request: Request, Response: Response) => {
		try {
			console.log("from test controller ", this);
			this.advancedWordleService.testService();
		} catch (error) {}
	};
}

export default AdvancedWordleController;
