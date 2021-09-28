import Head from 'next/head'
import Header from "../components/Header"
import Banner from "../components/Banner"
import SmallCard from "../components/SmallCard"
import MediumCard from "../components/MeduimCard"

export default function Home({exploreData}) {

  return (
    <div className="">
      <Head>
        <title>Mat Airbnb</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Header/>
      <Banner/>

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Pull some data from a server - API endpoint*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({img, distance, location}) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}/>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          {cardsData?.map(({}) => (
            <MediumCard />
          ))}
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const exploreData = await fetch('https://links.papareact.com/pyp').then(
      (res) => res.json()
    );

  const cardsData = await fetch('https://links.papareact.com/zp1').then(
    (res) => res.json()
  );

  return {
    props: {
      exploreData,
      cardsData
    }
  };
}