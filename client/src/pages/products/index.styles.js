import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings";

export const HeadingRow = tw.div`flex`;
export const Heading = tw(SectionHeading)`text-gray-900`;
export const Wrapper = tw.div`flex flex-col md:flex-row mt-6`;
export const Options = styled.div`
  ${tw`w-auto md:w-full md:w-1/3 mt-10 md:pr-8 sticky`}
  align-self: flex-start;
  min-width: 260px;
  top: 150px;

  @media (max-width: 767px) {
    position: relative;
    min-width: 100%;
  }
`;
export const Posts = tw.div`sm:-mr-8 flex flex-wrap w-full md:w-auto justify-between`;
export const PostContainer = styled.div`
  ${tw`mt-10 md:pr-8`}
  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-auto`}
      }
      ${Image} {
        ${tw`w-full!`}
        object-fit: cover;
      }

      > div {
        cursor: default;
      }
    `}
    width: 100%;

  @media (min-width: 630px) {
    width: 48%;
  }

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1100px) {
    width: 33.33333%;
  }
`;
export const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg w-full`;
export const Image = styled.img`
  ${tw`h-64 w-full rounded-t-lg`}
  object-fit: scale-down;
`;
export const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
export const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
export const Title = tw.div`mt-1 font-black text-gray-900 group-hover:text-primary-500 transition duration-300`;
