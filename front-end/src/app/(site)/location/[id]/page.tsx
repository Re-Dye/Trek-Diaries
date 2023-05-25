import locateStyle from "./page.module.css";
import ButtonFollow from "./components/ButtonFollow";
import ButtonAddPost from "./components/ButtonAddPost";
import Posts from "./components/Posts";
import {TbLocationFilled }from "react-icons/tb"
import { notFound } from "next/navigation";

async function fetchLocationData(id: string) {
  const res: Response = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/fetchLocaitonData?id=${id}`,
    { cache: "no-store" }
  );
  
  if(!res.ok) return undefined

  return res.json();
}

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const locationID: string = params.id;
  const data = await fetchLocationData(locationID);

  if (!data) {
    notFound()
  }

  return (
    <div className={locateStyle.wrapper}>
      <div className={locateStyle.left}></div>
      <div className={locateStyle.center}>
        <div className={locateStyle.cTop}>
            <div className={locateStyle.header}>
              <div className={locateStyle.hText}>
                <div className={locateStyle.locName}>
                <TbLocationFilled size={28}/>
                <h1>{data.address}</h1>
                </div>
                <p>{data.description}</p>
              </div>
              <div className={locateStyle.hButton}>
                <ButtonAddPost locationID={locationID} />
                <ButtonFollow locationID={locationID} />
              </div>
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
