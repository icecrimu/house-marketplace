import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

export default function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchListing, setLastFetchListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    async function fetchListings() {
      try {
        //Get reference
        const listingRef = collection(db, "listings")

        //Create query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        )

        //Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]

        setLastFetchListing(lastVisible)

        const listings = []

        querySnap.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Counld not fetch listing")
      }
    }

    fetchListings()
  }, [])

  async function handleFetchMoreListings() {
    try {
      //Get reference
      const listingRef = collection(db, "listings")

      //Create query
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(10)
      )

      //Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]

      setLastFetchListing(lastVisible)

      const listings = []

      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(prevState => [...prevState, ...listings])

      setLoading(false)
    } catch (error) {
      toast.error("Counld not fetch listing")
    }
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map(listing => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />
          {lastFetchListing && (
            <p className="loadMore" onClick={handleFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  )
}
