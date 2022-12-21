import { useEffect, useState } from "react"

const useAdmin = uid => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (uid) {
      fetch(`http://localhost:5000/users/admin/${uid}`)
        .then(res => res.json())
        .then(data => {
          setIsAdmin(data.isAdmin)
          setIsAdminLoading(false);
        })
    }
  }, [uid])
  return [isAdmin, isAdminLoading]
}

export default useAdmin;