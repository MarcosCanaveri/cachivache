import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index:true },
    status: { type: Boolean, default: true, index:true }
});
    
productSchema.plugin(mongoosePaginate);

export const ProductModel = model('products', productSchema);

