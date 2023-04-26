import { useState, useEffect } from "react";
async function fetchLocationData(id: string) {
  //console.log("inside fetchLocationData")
  const res: any = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/fetchLocaitonData?id=${id}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default function Header(id: string) {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const dummydata: any = await fetchLocationData(id.id);
      setData(dummydata);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>{data.address}</h1>
      <br />
      <h1>{data.description}</h1>
    </div>
  );
}
