import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ConfrimAlert from '../../utilities/ConfirmAlert/ConfrimAlert';
import LoadingSpinner from '../../utilities/LoadingSpinner/LoadingSpinner';

const MyProducts = () => {
  const { user } = useContext(AuthContext)
  const [deleteProduct, setDeleteProduct] = useState('')
  const [ads, setAds] = useState('')
  const [removeAds, setRemove] = useState('')
  const [loading, setLoading] = useState(false);

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ['products', user?.uid],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/my-products?uid=${user.uid}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('access-token')}`
        }
      })
      const data = await res.json()
      return data
    }

  })

  const handleAds = (product) => {
    setLoading(true)
    fetch(`http://localhost:5000/product/get-ads/${product._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success(`${product.name} ads published`)
          setLoading(false)
          refetch();
        }
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something happened wrong!')
      })
  }

  const handleRemoveAds = (product) => {
    setLoading(true)
    fetch(`http://localhost:5000/product/remove-ads/${removeAds._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success(`${product.name} ads removed`)
          setLoading(false)
          refetch();
        }
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something happened wrong!')
      })
  }


  const handleproductDelete = (product) => {
    setLoading(true)
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
          setLoading(false)
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
                    {product?.sellStatus === true ?
                      <label className="btn btn-xs rounded text-white">Available</label>
                      :
                      <button className="btn btn-sm rounded text-white" disabled>Sold</button>
                    }
                  </td>
                  <td>
                    {
                      product?.sellStatus === 'sold' ? null :
                        product?.adsStatus === 'yes' ?
                          <label htmlFor="ConfirmRemoveAds" onClick={() => setRemove(product)} className="btn btn-sm btn-warning rounded text-white">Remove Ads</label>
                          :
                          <label htmlFor="ConfirmAds" onClick={() => setAds(product)} className="btn btn-sm btn-primary rounded text-white">Get Ads</label>
                    }

                  </td>
                  <th>
                    <label htmlFor="confirmAlert" className="btn btn-sm btn-error rounded text-white cursor-pointer" onClick={() => setDeleteProduct(product)} disabled={product?.productType === 'admin' ? true : false}><FaTrashAlt></FaTrashAlt></label>
                  </th>
                </tr>
              )
            }
          </tbody>
        </table>
        {
          loading && <LoadingSpinner></LoadingSpinner>
        }
        {
          isLoading && <LoadingSpinner></LoadingSpinner>
        }
      </div >

      {
        ads && <ConfrimAlert
          htmlFor="ConfirmAds"
          title={`Make sure, you want to publish Ads?`}
          message={`If you make it, you will be see the product ads on store`}
          successAction={handleAds}
          successButtonName="Confirm"
          modalData={ads}
        >
        </ConfrimAlert>
      }

      {
        removeAds && <ConfrimAlert
          htmlFor="ConfirmRemoveAds"
          title={`Make sure, you want to removed Ads?`}
          message={`If you make it, you can't see the product ads on store`}
          successAction={handleRemoveAds}
          successButtonName="Confirm"
          modalData={ads}
        >
        </ConfrimAlert>
      }

      {
        deleteProduct && <ConfrimAlert
          htmlFor="confirmAlert"
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