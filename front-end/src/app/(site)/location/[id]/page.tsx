import locateStyle from "./page.module.css";
import ButtonFollow from "./components/ButtonFollow";
import ButtonAddPost from "./components/ButtonAddPost";
import Posts from "./components/Posts";

async function fetchLocationData(id: string) {
  const res: any = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/fetchLocaitonData?id=${id}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const locationID: string = params.id;
  const data = await fetchLocationData(locationID);

  return (
    <div className={locateStyle.wrapper}>
      <div className={locateStyle.left}></div>
      <div className={locateStyle.center}>
        <div className={locateStyle.cTop}>
          <div className={locateStyle.locatefield}>
            <div className={locateStyle.header}>
              <div>
                <h1>{data.address}</h1>
                <h1>{data.description}</h1>
              </div>
            </div>
            <ButtonAddPost locationID={locationID} />
            <ButtonFollow locationID={locationID} />
          </div>
        </div>

        <div className={locateStyle.cBottom}>
          <Posts locationId={params.id} />
        </div>
      </div>

      <div className={locateStyle.left}></div>
    </div>
  );
}
