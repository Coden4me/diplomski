import tw from "twin.macro";

import useAnimatedNavToggler from "helpers/useAnimatedNavToggler";

import logo from "images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import GoogleButton from "react-google-button";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import Dropdown from "./dropdown";

import {
  DesktopNavLinks,
  GoogleLink,
  Header,
  LogoLink,
  NavToggle,
  NavLinks,
  NavLink,
  MobileNavLinks,
  MobileNavLinksContainer,
} from "./index.styles";

const reduxProps = createSelector(
  (state) => state.auth,
  (state) => state.userData.isSubscribed,
  (auth, isSubscribed) => ({ ...auth, isSubscribed })
);

const getLinks = (isAuthenticated, user, isSubscribed) => (
  <NavLinks key={1}>
    <NavLink to="/about">About Us</NavLink>
    <NavLink to="/contact">Contact</NavLink>
    <NavLink to="/products">Products</NavLink>
    {isAuthenticated && <NavLink to="/compare">Compare</NavLink>}
    {isAuthenticated && <Dropdown user={user} isSubscribed={isSubscribed} />}
    {!isAuthenticated && (
      <GoogleLink href="http://localhost:5000/api/auth/google">
        <GoogleButton />
      </GoogleLink>
    )}
  </NavLinks>
);

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ className, collapseBreakpointClass = "lg" }) => {
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];
  const { isAuthenticated, isSubscribed, ...rest } = useSelector(reduxProps);

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        <LogoLink to="/">
          <img src={logo} alt="logo" />
          Treact
        </LogoLink>
        {getLinks(isAuthenticated, rest, isSubscribed)}
      </DesktopNavLinks>

      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        <LogoLink to="/">
          <img src={logo} alt="logo" />
          Treact
        </LogoLink>
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {getLinks(isAuthenticated, rest, isSubscribed)}
        </MobileNavLinks>
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};
