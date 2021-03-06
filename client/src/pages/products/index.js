import { useEffect, useRef, useState } from "react";
import equal from "fast-deep-equal";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import {
  Category,
  Heading,
  HeadingRow,
  Image,
  Info,
  Post,
  PostContainer,
  Posts,
  Title,
  Wrapper,
  Options,
} from "./index.styles";
import { PrimaryButton } from "components/misc/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { getSearchProducts } from "reduxStore/actions";
import { getImage } from "helpers/getImage";

const redux = createSelector(
  (state) => state.product.products,
  (state) => state.product.total,
  (state) => state.auth.isAuthenticated,
  (products, total, isAuthenticated) => ({ products, total, isAuthenticated })
);

const Products = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [sale, setSale] = useState(false);
  const categoryRef = useRef(null);
  const saleRef = useRef(false);
  const { products, total, isAuthenticated } = useSelector(redux);

  useEffect(() => {
    dispatch(getSearchProducts(null, false));
  }, [dispatch]);

  const hasChanged = () =>
    !equal(category, categoryRef.current) || sale !== saleRef.current;

  const changeCategory = (e) => {
    const { checked, name } = e.target;
    if (!checked) {
      setCategory((prev) => prev.filter((v) => v !== name));
    } else {
      setCategory((prev) => {
        const catgs = prev ?? [];
        return [...catgs, name];
      });
    }
  };

  const changeSale = () => setSale((prev) => !prev);

  const onSubmit = (e) => {
    e.preventDefault();
    categoryRef.current = category;
    saleRef.current = sale;
    dispatch(getSearchProducts(JSON.stringify(category), sale));
  };

  const fetchData = () =>
    dispatch(
      getSearchProducts(JSON.stringify(category), sale, products.length)
    );

  return (
    <AnimationRevealPage>
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>Products</Heading>
          </HeadingRow>
          <Wrapper>
            <Options>
              <h6 className="text-gray-900 text-lg font-medium mb-3">
                Kategorije
              </h6>
              <label className="flex cursor-pointer mb-2 items-center">
                <input
                  id="vo??e"
                  name="vo??e"
                  type="checkbox"
                  onChange={changeCategory}
                  defaultChecked={category?.includes("vo??e")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Vo??e</span>
              </label>
              <label className="flex cursor-pointer mb-2 items-center">
                <input
                  id="povr??e"
                  name="povr??e"
                  type="checkbox"
                  onChange={changeCategory}
                  defaultChecked={category?.includes("povr??e")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Povr??e</span>
              </label>
              <label className="flex cursor-pointer mb-2 items-center">
                <input
                  id="bra??no"
                  name="bra??no"
                  type="checkbox"
                  onChange={changeCategory}
                  defaultChecked={category?.includes("bra??no")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Bra??no</span>
              </label>
              <label className="flex cursor-pointer mb-2 items-center">
                <input
                  id="bezalkoholna pi??a"
                  name="bezalkoholna pi??a"
                  type="checkbox"
                  onChange={changeCategory}
                  defaultChecked={category?.includes("bezalkoholna pi??a")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Bazalkoholna pi??a</span>
              </label>
              <label className="flex cursor-pointer mb-2 items-center">
                <input
                  id="alkoholna pi??a"
                  name="alkoholna pi??a"
                  type="checkbox"
                  onChange={changeCategory}
                  defaultChecked={category?.includes("alkoholna pi??a")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Alkoholna pi??a</span>
              </label>
              <label className="flex cursor-pointer mb-2 items-center">
                <input
                  id="suho vo??e"
                  name="suho vo??e"
                  type="checkbox"
                  onChange={changeCategory}
                  defaultChecked={category?.includes("suho vo??e")}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <span className="ml-2">Suho vo??e</span>
              </label>
              <div className="my-8 border-b-2 border-gray-300 w-full" />
              <h6 className="text-gray-900 text-lg font-medium mb-3">
                Proizvodi na akciji
              </h6>
              <label className="flex cursor-pointer mb-8 items-center">
                <input
                  id="candidates"
                  name="candidates"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  defaultChecked={sale}
                  onChange={changeSale}
                />
                <span className="ml-2">Proizvodi na akciji</span>
              </label>
              {hasChanged() && (
                <PrimaryButton className="w-full" onClick={onSubmit}>
                  Osvjezi
                </PrimaryButton>
              )}
            </Options>
            <Posts>
              <PostContainer featured={true}>
                <Post className="group">
                  <Image src="https://www.mccourier.com/wp-content/uploads/2021/05/Food-Beverages-1-1.jpg" />
                </Post>
              </PostContainer>
              <InfiniteScroll
                dataLength={products.length} //This is important field to render the next data
                next={fetchData}
                hasMore={total > products.length}
                style={{
                  display: "flex",
                  overflow: "none",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {products.map((p) => (
                  <PostContainer key={p._id}>
                    <Post
                      className="group"
                      as={isAuthenticated ? Link : "div"}
                      to={`/products/${p._id}`}
                    >
                      <Image src={getImage(p.img1, p.img2, p.img3)} />
                      <Info>
                        <Category>{p.category}</Category>
                        <Title>{p.name}</Title>
                      </Info>
                    </Post>
                  </PostContainer>
                ))}
              </InfiniteScroll>
            </Posts>
          </Wrapper>
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};

export default Products;
