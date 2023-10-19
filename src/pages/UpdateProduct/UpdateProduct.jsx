import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UpdateProduct = () => {

  const [product, setProduct] = useState([]);
  const [featuredBrands, setFeaturedBrands] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse = await fetch('https://brandshop-server-ten.vercel.app/brands');
        const brandsData = await brandsResponse.json();
        setFeaturedBrands(brandsData);

        const productResponse = await fetch(`https://brandshop-server-ten.vercel.app/details/${id}`);
        const productData = await productResponse.json();
        setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);


  const handleUpdateProduct = e => {
    e.preventDefault();
    const form = e.target;

    const image = form.image.value;
    const name = form.name.value;
    const brandName = form.brandName.value;
    const type = form.type.value;
    const price = parseFloat(form.price.value);
    const rating = parseFloat(form.rating.value);

    const updatedProduct = { image, name, brandName, type, price, rating };

    // Send data to update the product
    fetch(`https://brandshop-server-ten.vercel.app/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Updated Successfully');
      })
      .catch(error => {
        console.error('Error updating product:', error);
        toast.error('Error updating product. Please try again later.');
      });
  }

  return (
    <div className="container mx-auto my-8 max-w-lg p-8 border rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Update a Product</h2>
      <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 gap-6">
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Image URL:
          </label>
          <input
            defaultValue={product.image}
            type="text"
            name="image"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Product Name:
          </label>
          <input
            defaultValue={product.name}
            type="text"
            name="name"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brandName" className="block text-sm font-medium text-gray-600">
            Brand Name:
          </label>
          <select
            name="brandName"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
          >
            <option value={product.brandName}>{product.brandName}</option>
            {featuredBrands.map(brand => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-600">
            Type:
          </label>
          <input
            defaultValue={product.type}
            type="text"
            name="type"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter product type"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            Price ($):
          </label>
          <input
            defaultValue={product.price}
            type="text"
            name="price"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-600">
            Rating:
          </label>
          <input
            defaultValue={product.rating}
            type="number"
            name="rating"
            step="0.1"
            min="0"
            max="5"
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter product rating"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Update
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default UpdateProduct;