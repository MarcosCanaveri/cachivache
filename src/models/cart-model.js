import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    id: { type: Number, required: true, unique: true },
    products: [
        {
            product: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            },
            quantity: { type: Number, default: 1 }
        }
    ]
});

export const CartModel = model('carts', CartSchema);