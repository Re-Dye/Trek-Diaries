async function fetchLocationData(id: string) {
  const res: any = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/fetchLocaitonData?id=${id}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function Header({ id }: { id: string }) {
  const data = await fetchLocationData(id)
  return (
    <div>
      <h1>{data.address}</h1>
      <h1>{data.description}</h1>
    </div>
  );
}
