import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import classnames from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import styles from "../../styles/coffee-store.module.css";

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  return {
    paths: coffeeStores.map((coffeeStore) => ({
      params: { id: coffeeStore.id.toString() },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(
    (coffeeStore) => coffeeStore.id.toString() === params.id
  );

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const { name, address, region, imgUrl } = coffeeStore;

  const handleUpVoteButton = () => {
    console.log("handle Up Vote !");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>

          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={classnames("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="icon address"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt="icon neighbourhood"
            />
            <p className={styles.text}>{region}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="icon vote"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upVoteButton} onClick={handleUpVoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
