import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useAuth } from "@/contexts/Authentication";
import useProducts from "@/hooks/useProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./styles.css";

const Cards = () => {
  const {
    user: { permissions },
  } = useAuth();
  const { getData } = useProducts();
  const [cards, setCards] = useState([]);

  const getCards = async () => {
    const getDataResponse = await getData(`?featured=1&limit=3`);
    setCards(getDataResponse);
  };

  useEffect(() => {
    getCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (isMobile) {
    return (
      <div style={{ margin: "40px 0" }}>
        <Slider {...settings}>
          {cards.map((item, key) => (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: 15,
                  padding: 15,
                  borderRadius: 12,
                  border: "1px solid rgba(0, 0, 0, 0.25)",
                  background: "#FFF",
                }}
                onClick={
                  permissions.includes("menu-external-gifts")
                    ? () => (window.location.href = "/gifts/products")
                    : null
                }
              >
                <img src={item.photoUrl} alt="" style={{ borderRadius: 12 }} />
                <div style={{ padding: 10 }}>
                  <h5 style={{ fontSize: 16 }}>{item.name}</h5>
                  <p
                    className="text-center"
                    style={{ color: "blue", fontSize: 12, fontFamily: "Arial" }}
                  >
                    {item.price}P
                  </p>
                  <p style={{ fontSize: 16 }}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <div className="container pt-5 pb-5">
      <div className=" d-flex row">
        <h4 className="pb-5" style={{ color: "#1584B3", fontSize: 20 }}>
          Brindes em destaque
        </h4>
      </div>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {cards.map((item, key) => (
          <div
            className="card home-card "
            style={{
              padding: 10,
              borderRadius: 12,
              border: "1px solid rgba(0, 0, 0, 0.25)",
            }}
            key={key}
            onClick={
              permissions.includes("menu-external-gifts")
                ? () => (window.location.href = "/gifts/products")
                : null
            }
          >
            <img
              src={item.photoUrl}
              className="card-img-top"
              alt=""
              style={{ borderRadius: 12 }}
            />
            <div className="card-body" style={{ padding: 10 }}>
              <h5 className="card-title" style={{ fontSize: 16 }}>
                {item.name}
              </h5>
              <p
                className="card-title text-center"
                style={{ color: "blue", fontSize: 12, fontFamily: "Arial" }}
              >
                {item.price}P
              </p>
              <p className="card-text" style={{ fontSize: 16 }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
