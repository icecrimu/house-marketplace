import { useState } from "react"
import { getAuth } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
export default function Profile() {
  const auth = getAuth()
  const [form, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const navigate = useNavigate()

  function handleLogout() {
    auth.signOut()
    navigate("/")
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={handleLogout}>
          Logout
        </button>
      </header>
    </div>
  )
}
