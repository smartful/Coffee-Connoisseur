import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  const { latlong, limit } = req.query;
  try {
    const response = await fetchCoffeeStores(latlong, limit);
    res.status(200).json(response);
  } catch (error) {
    console.error("There is an error on getCoffeeStoresByLocation : ", error);
    res.status(500).json({ message: "Hey mais Noooooooonnnn !", error });
  }
};

export default getCoffeeStoresByLocation;
