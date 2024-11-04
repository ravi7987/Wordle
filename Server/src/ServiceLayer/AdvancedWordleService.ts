import { Service } from "typedi";

@Service()
class AdvancedWordleService {
	constructor() {}

	public testService() {
		try {
			console.log("from client service ", this);
		} catch (error) {}
	}
}

export default AdvancedWordleService;
