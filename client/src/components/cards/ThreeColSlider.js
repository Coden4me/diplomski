import { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { getImage } from "helpers/getImage";
import { Link } from "react-router-dom";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  overflow: hidden;
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = styled.div`
  ${tw`h-full flex! flex-col sm:border sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`}
  width: 280px !important;
`;
const CardImage = styled.img(() => [
  tw`w-full h-56 sm:h-64 rounded sm:rounded-none sm:rounded-tl-4xl`,
  "object-fit: scale-down",
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

const sliderSettings = {
  arrows: false,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const ThreeColSlider = ({ title, data }) => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>{title}</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {data.map((p) => (
            <Card key={p._id}>
              <CardImage src={getImage(p.img1, p.img2, p.img3)} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{p.name}</Title>
                </TitleReviewContainer>
              </TextInfo>
              <PrimaryButton
                className="mt-0"
                as={Link}
                to={`/products/${p._id}`}
              >
                Pogledaj
              </PrimaryButton>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};

export default ThreeColSlider;
