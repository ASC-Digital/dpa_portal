import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { isMobile } from "react-device-detect";
import useBanners from "@/hooks/useBanners";
import { useLoader } from "@/contexts/Loader";
import "./styles.css";

import ARROW_LEFT from "@/assets/images/arrow-left.png";
import ARROW_RIGHT from "@/assets/images/arrow-right.png";

const Banners = () => {
  const carousel = useRef();
  const { listViewBanners } = useBanners();
  const { setLoader } = useLoader();
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    setLoader(true);
    const listViewBannersResponse = await listViewBanners();

    if (listViewBannersResponse.length === 0) {
      setLoader(false);
      setBanners([]);
      return;
    }

    setBanners(listViewBannersResponse.sort((a, b) => a.order - b.order));
    setLoader(false);
  };

  useEffect(() => {
    getBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    className: "center",
    centerMode: true,
    centerPadding: "150px",
    slidesToShow: 1,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
  };

  const settingsMobile = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (banners.length === 0) {
    return null;
  }

  if (isMobile) {
    return (
      <Slider ref={carousel} {...settingsMobile}>
        {banners.map((item, key) => (
          <div className="custom-banner" key={key}>
            {item.link ? (
              <a href={item.link} target="_blank" rel="noreferrer">
                <img
                  className="custom-banner-image"
                  src={item.imageUrl}
                  alt=""
                />
              </a>
            ) : (
              <>
                <img
                  className="custom-banner-image"
                  src={item.imageUrl}
                  alt=""
                />
              </>
            )}
          </div>
        ))}
      </Slider>
    );
  }

  return (
    <div>
      <Slider ref={carousel} {...settings}>
        {banners.map((item, key) => (
          <>
            <div className="custom-banner" key={key}>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer">
                  <img
                    className="custom-banner-image"
                    src={item.imageUrl}
                    alt=""
                  />
                  {item.descriptionImageUrl && (
                    <div className="custom-banner-description">
                      <div className="custom-banner-image-description">
                        <img
                          src={item.descriptionImageUrl}
                          alt={"sub-banner " + key}
                        />
                      </div>
                    </div>
                  )}
                </a>
              ) : (
                <>
                  <img
                    className="custom-banner-image"
                    src={item.imageUrl}
                    alt=""
                  />
                  {item.descriptionImageUrl && (
                    <div className="custom-banner-description">
                      <div className="custom-banner-image-description">
                        <img
                          src={item.descriptionImageUrl}
                          alt={"sub-banner " + key}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ))}
      </Slider>

      <div className="custom-arrow">
        <img
          className="custom-arrow-image"
          src={ARROW_LEFT}
          alt="< Ant."
          onClick={() => carousel.current.slickPrev()}
        />

        <img
          className="custom-arrow-image"
          src={ARROW_RIGHT}
          alt="Prox. >"
          onClick={() => carousel.current.slickNext()}
        />
      </div>
    </div>
  );
};

export default Banners;
