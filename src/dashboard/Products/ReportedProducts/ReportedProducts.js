import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ConfrimAlert from '../../utilities/ConfirmAlert/ConfrimAlert';
import LoadingSpinner from '../../utilities/LoadingSpinner/LoadingSpinner';

const ReportedProducts = () => {
  const { user } = useContext(AuthContext)
  const [deleteProduct, setDeleteProduct] = useState('')
  const [removeReport, setRemoveReport] = useState('')
  const [loading, setLoading] = useState(false);

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ['products', user?.uid],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/reported-products`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('access-token')}`
        }
      })
      const data = await res.json()
      return data
    }

  })

  const handleRemoveReport = (product) => {
    setLoading(true)
    fetch(`http://localhost:5000/product/remove-report/${product._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success(`${product.name} report cleared`)
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
        <h3 className="text-lg font-medium leading-6 text-gray-900 pb-5">Reproted Products</h3>
        {
          loading && <LoadingSpinner></LoadingSpinner>
        }
        {
          isLoading && <LoadingSpinner></LoadingSpinner>
        }
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Ads</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              !isLoading && products?.map((product, i) =>
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
                  <td>${product?.sellPrice}</td>
                  <td>
                    {product?.reportStatus === true ?
                      <button className="btn btn-xs rounded text-white" disabled>reported</button>
                      :
                      null
                    }
                  </td>
                  <td>
                    <label htmlFor="ConfirmRemoveReport" className="btn btn-sm rounded text-white cursor-pointer" onClick={() => setRemoveReport(product)}>Clear Report</label>
                  </td>
                  <td>
                    <label htmlFor="confirmAlert" className="btn btn-sm btn-error rounded text-white cursor-pointer" onClick={() => setDeleteProduct(product)}><FaTrashAlt></FaTrashAlt> <span className='pl-1'>Delete Product</span></label>
                  </td>
                </tr>
              )
            }
            {products.length <= 0 &&
              <tr>
                <td colSpan="6">
                  <h2 className='text-center font-bold'>No Product Found</h2>
                </td>
              </tr>
            }
          </tbody>
        </table>

      </div >

      {
        removeReport && <ConfrimAlert
          htmlFor="ConfirmRemoveReport"
          title={`Make sure, you want to clear Report?`}
          message={`If you make it, product will be fresh`}
          successAction={handleRemoveReport}
          successButtonName="Clear"
          modalData={removeReport}
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

export default ReportedProducts;