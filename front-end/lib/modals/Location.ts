import mongoose from 'mongoose'

interface ILocation {
    address: string,
    description: string
    registeredTime: mongoose.Schema.Types.Date
}

const locationSchema = new mongoose.Schema<ILocation>({
    address: {
        required: true,
        type: String,
        unique: true,
    },
    description: {
        required: true,
        type: String
    },
    registeredTime: {
        required: true,
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
})

const Location = mongoose.models.Location||mongoose.model("Location", locationSchema);
export default Location;