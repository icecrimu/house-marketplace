import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../firebase.config"

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import "swiper/css/bundle"
import { Swiper, SwiperSlide } from "swiper/react"
import Spinner from "./Spinner"
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

export default function Slider() {
  const [loading, setLoading] = useState(true)
  const [listing, setListing] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings")
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListing(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  if (loading) return <Spinner />

  return (
    listing && (
      <>
        <p className="exploreHeading">Recommended</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listing.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  height: "200px",
                  background: `url(${data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover"
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <p className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}{" "}
                  {data.type === "rent" && "/ month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}
