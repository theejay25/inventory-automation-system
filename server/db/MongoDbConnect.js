import mongoose from "mongoose";

const mongooseConnect = async () => {
    try {
        
        const connection = await mongoose.connect(process.env.CONNECTION_STRING)

        console.log('connection successful')

    } catch (error) {
        console.log(error)
        throw error
    }
}

export default mongooseConnect