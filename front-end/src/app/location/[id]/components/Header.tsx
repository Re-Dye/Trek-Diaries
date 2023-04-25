async function fetchLocationData(id: string) {
    const res: any = await fetch(
      `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/gTD?id=${id}`,
      { cache: "no-store" }
    );
    return res.json();
  }

export default async function Header(id: string) {
    const data: any = await fetchLocationData(id);  
    return (
    <div>
      <h1>The location is: </h1>
      {data.address}
      <br/>
      {data.description}
    </div>
  );  
}