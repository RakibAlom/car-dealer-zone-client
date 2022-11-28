import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import ConfrimAlert from '../../utilities/ConfirmAlert/ConfrimAlert';
import LoadingSpinner from '../../utilities/LoadingSpinner/LoadingSpinner';

const Sellers = () => {
  const [deleteUser, setDeleteUser] = useState(null)
  const [makeAdmin, setMakeAdmin] = useState(null)

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const userType = 'seller'
      const res = await fetch(`http://localhost:5000/users?userType=${userType}`)
      const data = await res.json()
      return data
    }

  })

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/user/make-admin/${user._id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success(`${user.name} maked admin successfully.`)
          refetch();
        }
      })
      .catch(err => {
        console.error(err.message)
        toast.error('Something happened wrong!')
      })
  }


  const handleUserDelete = (user) => {
    fetch(`http://localhost:5000/user/${user._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('access-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch()
          toast.success(`User ${user.name} deleted successfully!`)
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
        <h3 className="text-lg font-medium leading-6 text-gray-900 pb-5">All Users</h3>
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              users?.map((user, i) =>
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={user.avatar} alt="Avatar Tailwind CSS Component" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                        <div className="text-sm opacity-50">{user?.userType}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.email}
                  </td>
                  <td>
                    {user?.userType === 'admin' ?
                      <button className="btn btn-sm rounded text-white" disabled>Admin</button>
                      :
                      <label htmlFor="confirmMakeAdmin" onClick={() => setMakeAdmin(user)} className="btn btn-sm btn-primary rounded text-white">Make Admin</label>
                    }
                  </td>
                  <th>
                    <label htmlFor="confirmAlert" className="btn btn-sm btn-error rounded text-white cursor-pointer" onClick={() => setDeleteUser(user)} disabled={user?.userType === 'admin' ? true : false}><FaTrashAlt></FaTrashAlt></label>
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
        makeAdmin && <ConfrimAlert
          htmlFor="confirmMakeAdmin"
          title={`Are you want to make a admin?`}
          message={`If you make it, you can't access him.`}
          successAction={handleMakeAdmin}
          successButtonName="Confirm"
          modalData={makeAdmin}
        >
        </ConfrimAlert>
      }

      {
        deleteUser && <ConfrimAlert
          htmlFor="confirmAlert"
          title={`Are you sure want to delete?`}
          message={`If you delete ${deleteUser.name}, it cannot be undone.`}
          successAction={handleUserDelete}
          successButtonName="Delete"
          modalData={deleteUser}
        >
        </ConfrimAlert>
      }

    </>

  );
};

export default Sellers;