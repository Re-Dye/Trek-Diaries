"use client"
import {useState, useEffect} from "react"
import RealmConnect from "../../../../lib/realm"

async function fetchLocationData(id: string) {
    const user = await RealmConnect()
    const data = await user.functions.fetchLocationData(id);
    return data
}

export default function LocationPage({ params }: { params: { id: string } }) {
    // const data = await fetchLocationData(params.id)
    const [data, setData] = useState<any>()
    useEffect(() => {
        console.log("calling fetch location data")
        // setData(fetchLocationData(params.id))
        fetchLocationData(params.id).then(data=>{ // this executes the fetch only when promise is fulfilled
            setData(data)
            console.log(data)
        })
    }, [])
    return(
        <div>
            {/* <Suspense fallback={<p>Loading...</p>}> */}
                {/* <>{ data }</> */}
            {/* </Suspense> */}
          this is home page
        </div>
    )
}