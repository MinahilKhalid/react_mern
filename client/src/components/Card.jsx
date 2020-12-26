import React from "react";
import { Card as AntCard } from "antd";
const { Meta } = AntCard;
const Card = (props) => {
  const { name, price, img, id } = props.product;
  return (
    <>
      <AntCard
        onClick={() => props.handleCardClick(id)}
        hoverable
        style={{ width: 240 }}
        cover={<img alt={img} src={img} />}
      >
        <Meta title={name} description={price} />
      </AntCard>
    </>
  );
};

export default Card;
