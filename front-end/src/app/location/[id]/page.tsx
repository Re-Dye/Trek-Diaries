import MongoDBDataApi from "../../../../lib/mongodbDataApi"

// async function fetchLocationData(id: string) {
//     const data = await fetch()
//     console.log(data)
//     return data
// }

export default function LocationPage({ params }: { params: { id: string } }) {
    // fetchLocationData(params.id)
    return(
        <div>
            { params.id }
        </div>
    )
}