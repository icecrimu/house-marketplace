import { useState, useEffect, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

export default function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: "1",
    bathrooms: "1",
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitute: 0,
    longitude: 0
  })

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude
  } = formData

  const auth = getAuth()

  const navigate = useNavigate()
  const isMounted = useRef(true)

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, user => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate("/sign-in")
        }
      })
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  if (loading) {
    return <Spinner />
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  function handleMutate(e) {
    let boolean = null

    if (e.target.value === "true") {
      boolean = true
    }
    if (e.target.value === "false") {
      boolean = false
    }

    //Files
    if (e.target.files) {
      setFormData(prevState => ({ ...prevState, images: e.target.files }))
    }

    //Text/booleans/numbers
    if (!e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value
      }))
    }
  }

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label className="formLabel">Sell / Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={handleMutate}
            >
              Sell
            </button>

            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={handleMutate}
            >
              Rent
            </button>
          </div>

          <label className="formLabel">Name</label>
          <input
            className="formInputName"
            type="text"
            id="name"
            value={name}
            onChange={handleMutate}
            maxLength="32"
            minLength="10"
            required
          />

          <div className="formRooms flex">
            <div>
              <label className="formLabel">Bedrooms</label>
              <input
                type="text"
                className="formInputSmall"
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={handleMutate}
                min="1"
                max="50"
                required
              />
            </div>

            <div>
              <label className="formLabel">Bathrooms</label>
              <input
                type="text"
                className="formInputSmall"
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={handleMutate}
                min="1"
                max="50"
                required
              />
            </div>
          </div>
          <label className="formLabel">Parking spot</label>
          <div className="formButtons">
            <button
              className={parking ? "formButtonActive" : "formButton"}
              type="button"
              id="parking"
              value={true}
              onClick={handleMutate}
            >
              Yes
            </button>

            <button
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="parking"
              value={false}
              onClick={handleMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Furnished</label>
          <div className="formButtons">
            <button
              className={furnished ? "formButtonActive" : "formButton"}
              type="button"
              id="furnished"
              value={true}
              onClick={handleMutate}
            >
              Yes
            </button>

            <button
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="furnished"
              value={false}
              onClick={handleMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Address</label>
          <textarea
            className="formInputAddress"
            type="text"
            id="address"
            value={address}
            onChange={handleMutate}
            required
          />

          {!geolocationEnabled && (
            <div className="formLatLng flex">
              <div>
                <label className="formLabel">Latitude</label>
                <input
                  type="text"
                  className="formInputSmall"
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={handleMutate}
                  required
                />
              </div>

              <div>
                <label className="formLabel">Longitude</label>
                <input
                  type="text"
                  className="formInputSmall"
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={handleMutate}
                  required
                />
              </div>
            </div>
          )}

          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={true}
              onClick={handleMutate}
            >
              Yes
            </button>

            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="offer"
              value={false}
              onClick={handleMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Regular Price</label>
          <div className="formPriceDiv">
            <input
              type="text"
              className="formInputSmall"
              type="number"
              id="regularPrice"
              value={regularPrice}
              onChange={handleMutate}
              min="50"
              max="750000000"
              required
            />
            {type === "rent" && <p className="formPriceText">$ / Month</p>}
          </div>
          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                type="number"
                className="formInputSmall"
                id="discountedPrice"
                value={discountedPrice}
                onChange={handleMutate}
                min="50"
                max="750000000"
                required={offer}
              />
            </>
          )}

          <label className="formLabel">Images</label>
          <p className="imagesInfo">
            The first iamge will be the cover ( max 6 ).
          </p>
          <input
            className="formInputFile"
            type="file"
            id="images"
            onChange={handleMutate}
            max="6"
            accept=".jpg,.png,.jpeg"
            multiple
            required
          />
          <button type="submit" className="primaryButton createListingButton">
            Create Listing
          </button>
        </form>
      </main>
    </div>
  )
}
