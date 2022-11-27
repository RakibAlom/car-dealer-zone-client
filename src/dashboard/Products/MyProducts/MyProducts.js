import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import ConfrimAlert from '../../utilities/ConfirmAlert/ConfrimAlert';
import LoadingSpinner from '../../utilities/LoadingSpinner/LoadingSpinner';

const MyProducts = () => {
  const [deleteProduct, setDeleteProduct] = useState(null)
  const [ads, setAds] = useState(null)

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products`)
      const data = await res.json()
      return data
    }

  })

  const handleAds = (product) => {
    fetch(`http://localhost:5000/product/${product._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success(`${product.name} maked admin successfully.`)
          refetch();
        }
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something happened wrong!')
      })
  }


  const handleproductDelete = (product) => {
    fetch(`http://localhost:5000/product/${product._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch()
          toast.success(`product ${product.name} deleted successfully!`)
        }
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something happened wrong!')
      })
  }

  return (
    <>

      <div className="overflow-x-auto w-full">
        <h3 className="text-lg font-medium leading-6 text-gray-900 pb-5">My Products</h3>
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Status</th>
              <th>Ads</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              products?.map((product, i) =>
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="rounded w-16 h-12">
                          <img src={product.productThumbnail} alt={product?.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product?.name}</div>
                        <div className="text-sm opacity-50">{product?.registrationYear}</div>
                      </div>
                    </div>
                  </td>
                  <td>{product?.category}</td>
                  <td>{product?.brand}</td>
                  <td>${product?.sellPrice}</td>
                  <td>
                    {product?.sellStatus === 'sold' ?
                      <button className="btn btn-sm rounded text-white" disabled>Sold</button>
                      :
                      <label className="btn btn-xs rounded text-white">Available</label>
                    }
                  </td>
                  <td>
                    {product?.adsStatus === 'yes' ?
                      <label htmlhtmlFor="confirmAlert" onClick={() => setAds(product)} className="btn btn-sm btn-warning rounded text-white">Remove Ads</label>
                      :
                      <label htmlhtmlFor="confirmAlert" onClick={() => setAds(product)} className="btn btn-sm btn-primary rounded text-white">Get Ads</label>
                    }
                  </td>
                  <th>
                    <label htmlhtmlFor="confirmAlert" className="btn btn-sm btn-error rounded text-white cursor-pointer" onClick={() => setDeleteProduct(product)} disabled={product?.productType === 'admin' ? true : false}><FaTrashAlt></FaTrashAlt></label>
                  </th>
                </tr>
              )
            }
          </tbody>
        </table>
        {
          isLoading && <LoadingSpinner></LoadingSpinner>
        }
      </div >

      {
        ads && <ConfrimAlert
          title={`Make sure, you want shaw add?`}
          message={`If you make it, you will be see the product ads on store`}
          successAction={handleAds}
          successButtonName="Confirm"
          modalData={ads}
        >
        </ConfrimAlert>
      }

      {
        deleteProduct && <ConfrimAlert
          title={`Are you sure want to delete?`}
          message={`If you delete ${deleteProduct.name}, it cannot be undone.`}
          successAction={handleproductDelete}
          successButtonName="Delete"
          modalData={deleteProduct}
        >
        </ConfrimAlert>
      }

    </>

  );
};

export default MyProducts;