import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
	carts: {
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products',
				},
			},
		],
		default: [],
	},
});

const cartModel = mongoose.model('carts', cartSchema);

export default cartModel;