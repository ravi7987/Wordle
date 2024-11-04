import mongoose, { Schema } from 'mongoose';

/*
 *  Schema for settings collection 
 */
const SettingsSchema = new Schema({ 
	number_of_attempts: {
		type: Number,
        default: 5,
        required: true
	},
	candidates: {
		type: [String],
		required: true
	},
    answer: {
        type: String
    }
});

const settings = mongoose.model('settings', SettingsSchema);

export default settings;