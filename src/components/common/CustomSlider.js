import React from "react";
import Slider from "react-slick";
import { useDirectionState } from "../../Providers/DirectionProvider";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  const { endComplete: direction } = useDirectionState();
  const oppositeDirection = direction === "left" ? "right" : "left";

  return (
    <img
      alt="previous"
      className={className + " w-5 h-5"}
      style={style}
      onClick={onClick}
      src={require(`../../Images/arrow2-${oppositeDirection}-gray.png`)}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  const { endComplete: direction } = useDirectionState();

  return (
    <img
      alt="next"
      className={className + " w-5 h-5"}
      style={style}
      onClick={onClick}
      src={require(`../../Images/arrow2-${direction}-gray.png`)}
    />
  );
};

export default function CustomSlider({
  slidesToShow,
  slidesToScroll,
  infinite,
  children,
}) {
  const setting = {
    dots: false,
    infinite,
    speed: 400,
    slidesToShow,
    slidesToScroll,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return <Slider {...setting}>{children}</Slider>;
}
