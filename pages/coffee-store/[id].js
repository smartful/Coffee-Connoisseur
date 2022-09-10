import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import classnames from "classnames";
import styles from "../../styles/coffee-store.module.css";

import coffeeStoresData from "../../data/coffee-store.json";

export function getStaticPaths() {
  return {
    paths: coffeeStoresData.map((coffeeStore) => ({
      params: { id: coffeeStore.id.toString() },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id
      ),
    },
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore.name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>Back to home</a>
            </Link>
          </div>

          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{coffeeStore.name}</h1>
          </div>
          <Image
            src={coffeeStore.imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={classnames("glass", styles.col2)}>
          <div className={styles.iconWrapper}></div>
          <p>{coffeeStore.address}</p>
          <p>{coffeeStore.neighbourhood}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
