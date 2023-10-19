import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {

  const { _id, image, name, brandName, type, price, rating } = product;

  return (
    <div className="product-cart border h-60 p-4 mb-4 flex items-center bg-white shadow-lg rounded-lg">
      <div className="pr-4 w-1/2 h-full">
        <img src={image} alt={name} className="w-auto h-full object-cover rounded" />
      </div>
      <div className="product-details flex-1">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{brandName}</p>
        <p className="text-gray-600 mb-2">{type}</p>
        <p className="text-green-600 text-lg font-semibold mb-2">${price.toFixed(2)}</p>
        <p className="text-gray-600 mb-2">Rating: {rating}</p>
        <div className="buttons flex">
          <Link to={`/details/${_id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2">
            Details
          </Link>
          <Link to={`/update/${_id}`} className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;