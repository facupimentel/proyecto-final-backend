import { connect } from "mongoose";

const connectMongo = async (link) =>{
    try {
        await connect(link)
        console.log("connected mongoDB");
                
    } catch (error) {
        throw error
    }
}

export default connectMongo