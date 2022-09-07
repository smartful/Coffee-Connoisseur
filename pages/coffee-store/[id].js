import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <div>Coffee Store Page : {id}</div>;
    </div>
  );
};

export default CoffeeStore;
