import Head from "next/head";

import { PrismaClient } from "@prisma/client";
import dynamic from "next/dynamic";

export default function Home({ b }) {
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const MapWithNoSSR = dynamic(() => import("./Map"), { ssr: false });
  return (
    <>
    <div className="background-image"></div>
      <div className={`w-full h-screen p-8`}>
        <Head>
          <title>Stop Detection</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-full h-full flex flex-wrap bg-white shadow-lg   rounded-3xl items-center">
          <div className="h-full p-4 w-1/2 rounded space-y-5 overflow-scroll">
            {b.map((item, key) => (
              <div key={key} className="">
                <a
                className="text-2xl"
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${item[1]},${item[0]}`}
                >
                  Near <span className="font-semibold"> {`Stop ${key+1}`}</span>

                </a>
                <br/>
                <span className="text-sm text-gray-500"> {`(${item[1]},${item[0]})`}</span>
                <div className="ml-5 grid grid-cols-2">
                  {item[2].map(
                    (here,key2) =>
                      here.categories && (
                        <p key={`p-${key}-${key2}`} className="my-3">
                          <span className="text-lg font-medium capitalize">
                            {here.title.toLowerCase()}
                          </span>
                          <br/>
                          <span className="ml-1 text-base font-medium text-gray-500">
                            {here.categories[0].name}
                            <br/>
                            </span>
                            <span className="ml-1 text-sm font-medium">
                            {(getDistanceFromLatLonInKm(item[1],item[0],here.position.lat,here.position.lng)*100).toFixed(2)}mt
                          </span>

                          <span className="text-sm text-gray-500"> ({here.position.lat},{here.position.lng})</span>


                        </p>
                      )
                  ,item)}
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/2 h-full p-8 rounded-xl" id="map">
            <MapWithNoSSR a={b} />
          </div>
        </div>
      </div>
    </>
  );
}
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const geojson = await prisma.stops2.findMany();
  var a = geojson.map((item) => JSON.parse(item.st_asgeojson).coordinates);
  var b = await Promise.all(
    a.map(async (item) => {
      const resp = await fetch(
        `https://discover.search.hereapi.com/v1/browse?at=${item[1]},${item[0]}&lang=ITA&limit=6&apiKey=${process.env.NEXT_PUBLIC_HERE_KEY}`
      );
      let datum = await resp.json();
      console.log;
      return [item[0], item[1], datum.items];
    })
  );

  //

  return {
    props: { b },
  };
}
