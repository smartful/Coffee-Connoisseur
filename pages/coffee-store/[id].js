import Link from "next/link";
import { useRouter } from "next/router";

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
    <div>
      <button>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </button>
      <div>Coffee Store Page : {id}</div>
      <p>{coffeeStore.name}</p>
      <p>{coffeeStore.address}</p>
    </div>
  );
};

export default CoffeeStore;
