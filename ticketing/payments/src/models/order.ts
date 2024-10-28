import { OrderStatus } from "@ajauthticket/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import mongoose, { version } from "mongoose";

interface OrderAttrs {
    id: string;
    version: number;
    userId: string;
    price: number;
    status: OrderStatus
}

interface OrderDoc extends mongoose.Document {
    version: number;
    userId: string;
    price: number;
    status: OrderStatus
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

OrderSchema.set('versionKey', 'version');
OrderSchema.plugin(updateIfCurrentPlugin);

OrderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status
    });
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export {Order};