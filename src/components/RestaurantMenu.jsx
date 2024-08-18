import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../hooks/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import ShimmerMenu from './Shimmer/ShimmerMenu';
import RestaurantInfo from './RestaurantInfo';
import { RES_CART_IMG } from '../utils/constants';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(null);
  const { data: RestaurantMenuDetails, error, loading } = useRestaurantMenu(resId);

  if (loading) {
    return <ShimmerMenu />;
  }

  if (error) {
    return <div>Error loading menu: {error.message}</div>;
  }

  const { ResInfo, ResMenu } = RestaurantMenuDetails || {};

  const ResInfoData = {
    name: ResInfo?.card?.card?.info?.name,
    id: ResInfo?.card?.card?.info?.id,
    img: RES_CART_IMG + ResInfo?.card?.card?.info?.cloudinaryImageId,
    place: ResInfo?.card?.card?.info?.areaName,
    deliveryfee: ResInfo?.card?.card?.info?.feeDetails?.totalFee / 100,
  };

  const handleShowItem = (currentIndex) => {
    setShowIndex(currentIndex === showIndex ? null : currentIndex);
  };

  return (
    <div className="mx-auto mt-24 mb-10 2xl:w-1/2 md:w-4/5 sm:px-7 px-2">
      <>
        <RestaurantInfo ResInfo={ResInfo} />
        <hr className="border-1 border-dashed border-b-[#d3d3d3] my-4" />
        {ResInfo?.card?.card?.info?.isOpen ? (
          <ul className="main-menu-container">
            {ResMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((category, index) => (
              category?.card?.card?.itemCards ? (
                <li key={category?.card?.card?.title} className="cursor-pointer">
                  <RestaurantCategory
                    {...category?.card?.card}
                    ShowItem={index === showIndex}
                    handleShowItem={() => handleShowItem(index)}
                    ResInfoData={ResInfoData}
                  />
                </li>
              ) : null
            ))}
          </ul>
        ) : (
          <h2 className="resMsg font-ProximaNovaMed text-sm">
            Uh-oh! The outlet is not accepting orders at the moment. We&apos;re working to get them back online
          </h2>
        )}
      </>
    </div>
  );
};

export default RestaurantMenu;