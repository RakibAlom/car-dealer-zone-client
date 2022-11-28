import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate()
  const date = format(new Date(), 'P')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [disabled, setDisabled] = useState(false);

  // Get Category
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/categories');
      const data = await res.json();
      return data;
    }
  })

  // Get Brand
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/brands');
      const data = await res.json();
      return data;
    }
  })

  // Add Product
  const handleAddProduct = data => {
    setDisabled(true)
    const image = data.productThumbnail[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgData => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const product = {
            name: data.name,
            category: data.category,
            brand: data.brand,
            views: 0,
            sellPrice: data.sellPrice,
            originalPrice: data.originalPrice,
            registrationYear: data.registrationYear,
            mileage: data.mileage,
            fuelType: data.fuelType,
            engineCapacity: data.engineCapacity,
            seats: data.seats,
            transmission: data.transmission,
            description: data.description,
            adsStatus: data.adsStatus,
            conditionType: data.conditionType,
            mobileNumber: data.mobileNumber,
            location: data.location,
            productThumbnail: imgData.data.url,
            addDate: date,
            sellerId: user.uid,
            sellerName: user.displayName,
            sellStatus: true,
          }

          // save doctor information to the database
          fetch('http://localhost:5000/product', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: `bearer ${localStorage.getItem('access-token')}`
            },
            body: JSON.stringify(product)
          })
            .then(res => res.json())
            .then(result => {
              if (result.acknowledged) {
                toast.success(`${data.name} is added successfully`);
                navigate('/dashboard/products')
                setDisabled(false)
              }
            })
        }
      })
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900 pb-5">New Product</h3>
        </div>
        <div className="mt-5 md:mt-0">
          <form onSubmit={handleSubmit(handleAddProduct)} method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Car Name</label>
                    <input type="text" {...register("name", {
                      required: "Name is Required"
                    })} id="name" autoComplete="name" placeholder='ex: Tesla Model X' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="registrationYear" className="block text-sm font-medium text-gray-700 mb-2">Registration Year</label>
                    <input type="text"  {...register("registrationYear", {
                      required: "Car name required"
                    })} id="registrationYear" autoComplete="registrationYear" placeholder='ex: 2020' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.registrationYear && <p className='text-red-500'>{errors.registrationYear.message}</p>}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select id="category" {...register("category", {
                      required: "Category required"
                    })} className="select mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#f06425] focus:outline-none focus:ring-[#f06425] sm:text-sm" required>
                      <option defaultValue="">Select Category</option>
                      {
                        categories.map((category, i) =>
                          <option defaultValue={category.name} key={i}>{category.name}</option>
                        )
                      }
                    </select>
                    {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <select id="brand" {...register("brand", {
                      required: "Brand required"
                    })} className="select mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#f06425] focus:outline-none focus:ring-[#f06425] sm:text-sm" required>
                      <option defaultValue="">Select Brand</option>
                      {
                        brands.map((brand, i) =>
                          <option defaultValue={brand.name} key={i}>{brand.name}</option>
                        )
                      }
                    </select>
                    {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="sellPrice" className="block text-sm font-medium text-gray-700 mb-2">Sell Price</label>
                    <input type="text" {...register("sellPrice", {
                      required: "Sell Price required"
                    })} id="sellPrice" autoComplete="sellPrice" placeholder='ex: 18000' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.sellPrice && <p className='text-red-500'>{errors.sellPrice.message}</p>}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="originalPrice" {...register("originalPrice")} className="block text-sm font-medium text-gray-700 mb-2">Original Price (Optional)</label>
                    <input type="text" name="originalPrice" id="originalPrice" autoComplete="originalPrice" placeholder='ex: 24000' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" />
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="conditionType" className="block text-sm font-medium text-gray-700">Condition Type</label>
                    <select id="conditionType" {...register("conditionType", {
                      required: "Condition Type required"
                    })} className="select mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#f06425] focus:outline-none focus:ring-[#f06425] sm:text-sm" required>
                      <option defaultValue="good">Good</option>
                      <option defaultValue="excellent">Excellent</option>
                      <option defaultValue="fair">Fair</option>
                    </select>
                    {errors.conditionType && <p className='text-red-500'>{errors.conditionType.message}</p>}
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input type="text" {...register("mobileNumber", {
                      required: 'Mobile Number is required.'
                    })} id="mobileNumber" autoComplete="mobileNumber" placeholder='ex: 017000000000' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.mobileNumber && <p className='text-red-500'>{errors.mobileNumber.message}</p>}
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input type="text" {...register("location", {
                      required: 'Location is required.'
                    })} id="location" autoComplete="location" placeholder='ex: Lamapara, Sylhet' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="productThumbnail" className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <input type="file" {...register("productThumbnail", {
                      required: "Product image required"
                    })} id="productThumbnail" className="file-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.productThumbnail && <p className='text-red-500'>{errors.productThumbnail.message}</p>}
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
                    <input type="text" {...register("mileage", {
                      required: 'Mileage is required.'
                    })} id="mileage" autoComplete="mileage" placeholder='ex: 14,000' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.mileage && <p className='text-red-500'>{errors.mileage.message}</p>}
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                    <input type="text" {...register("fuelType", {
                      required: 'Fule type is required'
                    })} id="fuelType" autoComplete="fuelType" placeholder='ex: Octane' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.fuelType && <p className='text-red-500'>{errors.fuelType.message}</p>}
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="engineCapacity" className="block text-sm font-medium text-gray-700 mb-2">Engine Capacity (Optional)</label>
                    <input type="text" {...register("engineCapacity")} id="engineCapacity" autoComplete="engineCapacity" placeholder='ex: 1500 cc' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" />
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">Seats (Optional)</label>
                    <input type="text" {...register("seats")} id="seats" autoComplete="seats" placeholder='ex: 5' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" />
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                    <input type="text" {...register("transmission", {
                      required: 'Transmission is required'
                    })} id="transmission" autoComplete="" placeholder='ex: Automatic' className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" required />
                    {errors.transmission && <p className='text-red-500'>{errors.transmission.message}</p>}
                  </div >

                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="adsStatus" className="block text-sm font-medium text-gray-700 mb-2">Want to shoaw as a Ads?</label>
                    <select id="adsStatus" {...register("adsStatus")} autoComplete="adsStatus" className="select mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#f06425] focus:outline-none focus:ring-[#f06425] sm:text-sm">
                      <option defaultValue="no">no</option>
                      <option defaultValue="yes">yes</option>
                    </select>
                  </div >

                  <div className="col-span-12">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea {...register("description", {
                      required: 'Description is required'
                    })} id="description" autoComplete="description" className="textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#f06425] focus:ring-[#f06425]" rows="6" placeholder="Enter your product details" required></textarea>
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                  </div >

                </div >
              </div >
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-[#f06425] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#FF731D] focus:outline-none focus:ring-2 focus:ring-[#f06425] focus:ring-offset-2" disabled={disabled}>Publish Product</button>
              </div>
            </div >
          </form >
        </div >
      </div >
    </div >
  );
};

export default AddProduct;