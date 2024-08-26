import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { useSelector } from "react-redux";

import { HamburgerMenu } from "./HamburgerMenu";
import { NavBarDesktop, NavBarMobile } from "./NavBar";
import { TypeyLogo } from "./TypeyLogo";
import { ProfileDesktop, ProfileMobile } from "./Profile";

import { RootState } from "../../app/store";

const navigationLinks = [
  { name: "Home", href: "/", current: true },
  { name: "Create Passage", href: "/passage/new", current: false },
];

const userNavigationLinks = [
  { name: "Profile", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
  { name: "Sign out", href: "#", current: false },
];

export default function PageHeader() {
  const auth = useSelector((state: RootState) => state.auth);
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
        {auth.user && <ProfileMobile navigationLinks={userNavigationLinks} />}
      </DisclosurePanel>
    </Disclosure>
  );
}
