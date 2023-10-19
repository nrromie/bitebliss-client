import toast, { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react';

const AddProduct = () => {

  const [FeaturedBrands, setFeaturedBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://brandshop-server-ten.vercel.app/brands');
        const data = await response.json();
        setFeaturedBrands(data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = e => {
    e.preventDefault();
    const form = e.target;

    const image = form.image.value;
    const name = form.name.value;
    const brandName = form.brandName.value;
    const type = form.type.value;
    const price = parseFloat(form.price.value);
    const shortDescription = form.shortDescription.value;
    const rating = parseFloat(form.rating.value);

    const newProduct = { image, name, brandName, type, price, shortDescription, rating };

    //send data
    fetch('https://brandshop-server-ten.vercel.app/products', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          toast.success('Inserted Seccessfully')
          form.reset();
        }
      })
  }

  return (
    <div className='bg-white dark:bg-slate-800 py-8'>
      <div className="container mx-auto max-w-lg p-8 border rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 gap-6">
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-600 dark:text-white">
              Image URL:
            </label>
            <input
              type="text"
              name="image"
              className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
              placeholder="Enter image URL"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-white">
              Product Name:
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-600 dark:text-white">
              Brand Name:
            </label>
            <select
              name="brandName"
              className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
            >
              <option value="">Select a brand</option>
              {FeaturedBrands.map(brand => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-600 dark:text-white">
              Type:
            </label>
            <input
              type="text"
              name="type"
              className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
              placeholder="Enter product type"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600 dark:text-white">
              Price ($):
            </label>
            <input
              type="text"
              name="price"
              className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
              placeholder="Enter product price"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-600 dark:text-white">
              Short Description:
            </label>
            <textarea
              name="shortDescription"
              rows="3"
              className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
              placeholder="Enter short description"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-600 dark:text-white">
              Rating:
            </label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="0"
              max="5"
              className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
              placeholder="Enter product rating"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300"
          >
            Add Product
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default AddProduct;