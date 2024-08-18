import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const useRestaurantMenu = (resId) => {
    const [RestaurantMenuDetails, setRestaurantMenuDetails] = useState([])

    const userLocation = useSelector(store => store.location.userLocation)
    const lat = userLocation?.lat ? userLocation?.lat : 22.51800
    const lng = userLocation?.lng ? userLocation?.lng : 88.38320

    useEffect(() => {
        fetchRestaurantMenu();
    }, [])


    const fetchRestaurantMenu = async () => {
        try {
            const response = await fetch(`https://food-delivery-cors.vercel.app/api/proxy/swiggy/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
            if (!response.ok) {
                const err = response.status;
                throw new Error(err)
            }
            else {
                const json = await response.json();
                const ResInfo = json?.data?.cards?.find(card => card?.card?.card["@type"]?.includes("food.v2.Restaurant"))
                const ResMenu = json?.data?.cards?.find(card => card?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(menu => menu?.card?.card["@type"]?.includes("food.v2.ItemCategory")
                ))
                setRestaurantMenuDetails({ResInfo, ResMenu})
            }
        } catch (err) {
            console.log(err)
            setRestaurantMenuDetails(null)
        }
    }

    return RestaurantMenuDetails
}

export default useRestaurantMenu