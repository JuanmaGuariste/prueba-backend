import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
    code: {
		type: String,
		unique: true,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	purchaser: {
		type: String,
		required: true,
		index: true,
	},	
});

ticketSchema.set('timestamps',{
    createdAt: 'purchase_datetime',
    updatedAt: 'purchase_datetime'
}, true);

const ticketModel = mongoose.model('tickets', ticketSchema);

export default ticketModel;