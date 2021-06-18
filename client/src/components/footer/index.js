import { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";

import LogoImage from "images/logo.svg";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { subscribeGuest } from "reduxStore/actions";
import { createSelector } from "reselect";

const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 p-8 py-20 lg:py-24`;
const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
const SixColumns = tw.div`flex flex-wrap text-center sm:text-left lg:justify-between justify-around sm:justify-start -mt-12`;

const Column = tw.div`px-4 sm:px-0 md:w-auto mt-12 sm:ml-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;

const LinkList = tw.ul`mt-6 text-sm font-medium`;
const LinkListItem = tw.li`mt-3 text-left`;
const NavLink = tw(
  Link
)`border-b-2 border-transparent hocus:border-gray-700 pb-1 transition duration-300`;

const SubscribeNewsletterColumn = tw(Column)`text-left w-auto! mt-12`;
const SubscribeNewsletterContainer = tw.div`w-auto! lg:mx-0 `;
const SubscribeText = tw.p`mt-2 lg:mt-6 text-sm font-medium text-gray-600`;
const SubscribeForm = tw.form`mt-4 lg:mt-6 text-sm sm:flex sm:mx-0 w-full`;
const Input = tw.input`bg-gray-300 px-6 py-3 rounded sm:rounded-r-none border-2 sm:border-r-0 border-gray-400 hover:border-primary-500 focus:outline-none transition duration-300 w-full`;
const SubscribeButton = tw(
  PrimaryButtonBase
)`mt-4 sm:mt-0 w-full sm:w-auto rounded sm:rounded-l-none px-8 py-3`;

const Divider = tw.div`my-16 border-b-2 border-gray-300 w-full`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;

const CopyrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-500`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-700 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const reduxProps = createSelector(
  (state) => state.auth.isAuthenticated,
  (state) => state.newsletter.errors,
  (isAuthenticated, errors) => ({
    isAuthenticated,
    errors,
  })
);

const Footer = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, errors } = useSelector(reduxProps);
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(subscribeGuest(email));
    setEmail("");
  };

  return (
    <Container>
      <Content>
        <SixColumns>
          <Column>
            <ColumnHeading>Main</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <NavLink to="/products">Products</NavLink>
              </LinkListItem>
              <LinkListItem>
                <NavLink to="/contact">Contact</NavLink>
              </LinkListItem>
              <LinkListItem>
                <NavLink to="/about">About Us</NavLink>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Legal</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <NavLink to="/privacy">Privacy Policy</NavLink>
              </LinkListItem>
              <LinkListItem>
                <NavLink to="/terms">Terms of Service</NavLink>
              </LinkListItem>
            </LinkList>
          </Column>
          <SubscribeNewsletterColumn>
            <SubscribeNewsletterContainer>
              <ColumnHeading>Subscribe to our Newsletter</ColumnHeading>
              <SubscribeText>
                We deliver high quality blog posts written by professionals
                weekly. And we promise no spam.
              </SubscribeText>
              {!isAuthenticated && (
                <SubscribeForm onSubmit={onSubmit}>
                  <Input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors?.email && <p className="error-footer">{errors.email}</p>}
                  <SubscribeButton type="submit">Subscribe</SubscribeButton>
                </SubscribeForm>
              )}
            </SubscribeNewsletterContainer>
          </SubscribeNewsletterColumn>
        </SixColumns>
        <Divider />
        <ThreeColRow>
          <LogoContainer>
            <LogoImg src={LogoImage} />
          </LogoContainer>
          <CopyrightNotice>
            &copy; 2020-{new Date().getFullYear()}. All Rights Reserved.
          </CopyrightNotice>
          <SocialLinksContainer>
            <SocialLink href="https://facebook.com">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://twitter.com">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://youtube.com">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
        </ThreeColRow>
      </Content>
    </Container>
  );
};

export default Footer;
