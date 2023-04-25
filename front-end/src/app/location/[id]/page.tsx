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
        async function FetchData()
        {
            setData ( await fetchLocationData(params.id))
        }
        FetchData()
    }, [])

    useEffect(()=>{
        console.log(data)
    },
    [data])
    return(
        <div>
          this is home page
          <div>
            {data && <>{Object.keys(data).forEach((dummy)=>{
                return(
                    <div>
                        {dummy.address}
                    </div>
                )}
            )}
            </>}
          </div>
        </div>
    )
}