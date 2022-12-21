import React, { useEffect, useState } from "react"

const useSeller = uid => {
  const [isSeller, setIsSeller] = useState(false);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (uid) {
      fetch(`https://car-dealer-zone-server.vercel.app/users/seller/${uid}`)
        .then(res => res.json())
        .then(data => {
          setIsSeller(data.isSeller)
          setIsSellerLoading(false);
        })
    }
  }, [uid])
  return [isSeller, isSellerLoading]
}

export default useSeller;