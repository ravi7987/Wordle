import { Router } from 'express';
import Container from 'typedi';
import SettingsController from '../../ControllerLayer/SettingsController';
import ConventionalWordleController from '../../ControllerLayer/ConventionalWordleController';
import AdvancedWordleController from '../../ControllerLayer/AdvancedWordleController';

/* Function is used to declare signature for routes from Client side i.e. browser or mobile application */
export default function ClientRoutesHandler() {
    const router = Router();
    const settingsController = Container.get(SettingsController);
    const conventionalWordleController = Container.get(ConventionalWordleController);
    const advancedWordleController = Container.get(AdvancedWordleController);

    /* define signature for settings */
    router.get('/settings', settingsController.fetchSettings);
    router.patch('/settings-candidates', settingsController.patchCandidatesSettings);
    router.patch('/settings-attempts', settingsController.patchNumberOfAttemptsSettings);
    router.get('/clear-answer', settingsController.clearAnswer);

    /* define signature for conventional wordle */
    router.post('/process-input', conventionalWordleController.processInputCharacter);

    /* define signature for advanced wordle */
    router.post('/process-advanced-input', advancedWordleController.processInputWord);

    return router;
}
