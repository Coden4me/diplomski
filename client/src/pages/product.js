import React, { useEffect } from "react";
import SliderCard from "components/cards/ThreeColSlider";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { useDispatch, useSelector } from "react-redux";

import { getProduct, addToCompare, removeFromCompare } from "reduxStore/actions";
import { useParams } from "react-router";
import { createSelector } from "reselect";
import { getImage } from "helpers/getImage";

import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

const redux = createSelector(
  (state) => state.product,
  (state) => state.userData.compareProducts,
  ({ product, similar }, compareProducts) => ({
    product,
    similar,
    compareProducts,
  })
);

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col items-center lg:flex-row max-w-screen-xl mx-auto py-20 md:py-24 w-full`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`flex-shrink-0 md:h-auto w-auto`;
const TextColumn = styled(Column)((props) => [
  tw`w-full mt-8 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-8 lg:mr-16 md:order-first`
    : tw`md:ml-8 lg:ml-16 md:order-last`,
]);

const Image = styled.img((props) => ["max-width: 260px"]);
const TextContent = tw.div`lg:py-8`;

const Heading = tw(
  SectionHeading
)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight flex items-center`;
const Description = tw.p`text-2xl font-bold text-primary-500 mb-4 leading-relaxed mt-4`;

const Statistics = tw.div`mt-6 lg:mt-8 xl:mt-16 flex flex-wrap w-full`;
const Statistic = tw.div`text-lg mt-4 lg:mt-10 text-left pr-8 w-full sm:w-1/3`;
const Value = tw.div`font-bold text-primary-500 mb-4`;
const Key = tw.div`font-medium sm:text-base text-gray-700`;
const CardButton = tw(
  PrimaryButtonBase
)`text-sm mx-auto mt-2 flex justify-center`;

const fields = (obj, name) => (
  <Statistic>
    <h4 className="sm:text-xl mb-4 font-bold">{name}</h4>
    <Key>Dostupno</Key>
    <Value>{obj.available ? "DA" : "NE"}</Value>

    <Key>Kolicina</Key>
    <Value>{obj.qty ?? "/"}</Value>

    <Key>Cijena</Key>
    <Value>{obj.price ?? "/"} KM</Value>

    {obj.oldPrice && (
      <>
        <Key>Stara Cijena</Key>
        <Value>{obj.oldPrice} KM</Value>
      </>
    )}

    {obj.until && (
      <>
        <Key>Akcija traje do</Key>
        <Value>{obj.until}</Value>
      </>
    )}
  </Statistic>
);

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, similar, compareProducts } = useSelector(redux);

  const add = () => dispatch(addToCompare(product._id));
  const remove = () => dispatch(removeFromCompare(product._id));

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  if (!product) return null;

  return (
    <>
      <Container>
        <TwoColumn>
          <ImageColumn>
            <Image
              src={getImage(
                product.konzum.image,
                product.amko.image,
                product.ebios.image
              )}
            />
          </ImageColumn>
          <TextColumn textOnLeft={false}>
            <TextContent>
              <Heading>
                {product.name}
                {!compareProducts.includes(product._id) && (
                  <CardButton onClick={add}>Add to compare</CardButton>
                )}
                {compareProducts.includes(product._id) && (
                  <CardButton onClick={remove}>Remove from compare</CardButton>
                )}
              </Heading>
              <Description>{product.category}</Description>
              <Statistics>
                {fields(product.konzum, "Konzum")}
                {fields(product.amko, "Amko")}
                {fields(product.ebios, "Ebios")}
              </Statistics>
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
      <SliderCard title="Similar Products" data={similar} />
    </>
  );
};

export default Product;
