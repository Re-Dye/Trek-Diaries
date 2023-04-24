"use client"
import {useState, useEffect} from "react"
import RealmConnect from "../../../../lib/realm"

async function fetchLocationData(id: string) {
    const user = await RealmConnect()
    const data = user.functions.fetchLocationData(id)
    console.log(data)
    return data
}

export default function LocationPage({ params }: { params: { id: string } }) {
    // const data = await fetchLocationData(params.id)
    const [data, setData] = useState<any>()
    useEffect(() => {
        console.log("calling fetch location data")
        setData(fetchLocationData(params.id))
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])
    return(
        <div>
            {/* <Suspense fallback={<p>Loading...</p>}> */}
                {/* <>{ data }</> */}
            {/* </Suspense> */}
        </div>
    )
}