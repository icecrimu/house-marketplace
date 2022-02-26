import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"

export default function Profile() {
  const [user, setUser] = useState(null)

  const auth = getAuth()
  useEffect(() => {
    setUser(auth.currentUser)
  }, [])

  return user ? <h1>{user.displayName}</h1> : "Not logged In"
}
