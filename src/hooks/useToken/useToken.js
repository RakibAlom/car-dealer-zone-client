import { useEffect, useState } from "react";

const useToken = userId => {
  const [token, setToken] = useState('');
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost/5000/jwt?uid=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.accessToken) {
            localStorage.setItem('access-token', data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [userId]);
  return [token];
}

export default useToken;