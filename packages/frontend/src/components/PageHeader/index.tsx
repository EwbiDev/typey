import { Disclosure, DisclosurePanel } from "@headlessui/react";

import { TypeyLogo } from "./TypeyLogo";
import { NavBarDesktop, NavBarMobile } from "./NavBar";
import { ProfileMobile } from "./Profile";
import { ProfileDesktop } from "./Profile";
import { HamburgerMenu } from "./HamburgerMenu";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  profileLink: "/profile/1",
};

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
            <ProfileDesktop navigationLinks={userNavigationLinks} user={user} />
            <HamburgerMenu />
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <NavBarMobile navigationLinks={navigationLinks} />
        <ProfileMobile navigationLinks={userNavigationLinks} user={user} />
      </DisclosurePanel>
    </Disclosure>
  );
}
