import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { useDispatch, useSelector } from "react-redux";

import { getLandingProducts } from "reduxStore/actions";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";

const redux = createSelector(
  (state) => state.product.landing,
  (state) => state.auth.isAuthenticated,
  (products, isAuthenticated) => ({ products, isAuthenticated })
);

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 m-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${(props) => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.div
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.img`
  ${tw`relative rounded-t`}
  width: 100%;
  min-height: 200px;
  height: 200px;
  object-fit: scale-down;
`;

const CardButton = tw(PrimaryButtonBase)`text-sm w-full mt-2 flex justify-center`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500 text-center`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const tabs = [
  "Voće",
  "Povrće",
  "Brašno",
  "Suho voće",
  "Bezalkoholna pića",
  "Alkoholna pića",
];

const getImage = (img1, img2, img3) => {
  if (img1 && img1 !== "/" && img1.includes("http")) return img1;
  if (img2 && img2 !== "/" && img2.includes("http")) return img2;
  return img3;
};

const TabCardGrid = ({ heading }) => {
  const { products, isAuthenticated } = useSelector(redux);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    dispatch(getLandingProducts(activeTab));
  }, [dispatch, activeTab]);

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {tabs.map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        <TabContent
          variants={{
            current: {
              opacity: 1,
              scale: 1,
              display: "flex",
            },
            hidden: {
              opacity: 0,
              scale: 0.8,
              display: "none",
            },
          }}
          transition={{ duration: 0.4 }}
          initial="current"
          animate="current"
        >
          {products.map((product) => (
            <CardContainer key={product._id}>
              <Card className="group" initial="rest" animate="rest">
                <CardImageContainer
                  src={getImage(product.img1, product.img2, product.img3)}
                />
                <CardText>
                  <CardTitle>{product.name}</CardTitle>
                  {isAuthenticated && (
                    <CardButton as={Link} to={`/products/${product._id}`}>
                      Pogledaj
                    </CardButton>
                  )}
                </CardText>
              </Card>
            </CardContainer>
          ))}
        </TabContent>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

export default TabCardGrid;
