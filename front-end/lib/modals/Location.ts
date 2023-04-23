import mongoose from 'mongoose'

interface ILocation {
    address: string,
    description: string
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
    }
})

const Location = mongoose.models.Location||mongoose.model("Location", locationSchema);
export default Location;