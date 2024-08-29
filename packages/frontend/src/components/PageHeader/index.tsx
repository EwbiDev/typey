import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";

import { HamburgerMenu } from "./HamburgerMenu";
import { NavBarDesktop, NavBarMobile } from "./NavBar";
import { TypeyLogo } from "./TypeyLogo";
import { ProfileDesktop, ProfileMobile } from "./Profile";

import { AppDispatch, RootState } from "../../app/store";
import { logoutUser } from "../../features/auth/authActions";

export default function PageHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const userLinks = [
    { text: "Profile", href: "#", name: "profile"},
    { text: "Settings", href: "#", name: "settings"},
    { text: "Sign out", onClick: () => dispatch(logoutUser()), name: "signOut"},
  ];

  const guestLinks = [
    { text: "Register", href: "/register", name: "register"},
    { text: "Log in", href: "/login", name: "logIn"},
  ];

  const userNavigationLinks = auth.user ? userLinks : guestLinks;

  const navigationLinks = [
    { text: "Home", href: "/", name: "home"},
    { text: "Create Passage", href: "/passage/new", name: "createPassage"},
  ];

  return (
    <Disclosure as="nav" className="rounded-b-2xl bg-typey-default">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <TypeyLogo />
            </div>
            <NavBarDesktop navigationLinks={navigationLinks} />
          </div>
          <div className="flex items-center">
            <ProfileDesktop navigationLinks={userNavigationLinks} />
            <HamburgerMenu />
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <NavBarMobile navigationLinks={navigationLinks} />
        <ProfileMobile navigationLinks={userNavigationLinks} />
      </DisclosurePanel>
    </Disclosure>
  );
}
