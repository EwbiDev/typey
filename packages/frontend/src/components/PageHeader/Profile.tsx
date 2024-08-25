import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  DisclosureButton,
} from "@headlessui/react";

import { Navigation } from "../../types/types";
import { DefaultUserIcon } from "../Icons";

export function ProfileDesktop({
  navigationLinks,
  user,
}: Navigation.Prop.Profile) {
  return (
    <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-typey-primary text-sm focus:outline-none focus:ring-2 focus:ring-typey-secondary focus:ring-offset-2">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            {user?.image && (
              <img alt="" src={user.image} className="h-10 w-10 rounded-full" />
            )}
            {!user?.image && (
              <DefaultUserIcon className="h-10 w-10 bg-typey-secondary" />
            )}
          </MenuButton>
        </div>
        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {navigationLinks.map((item) => (
            <MenuItem key={item.name}>
              <a
                href={item.href}
                className="block px-4 py-2 text-sm text-typey-primary data-[focus]:bg-typey-primary-light data-[focus]:text-white"
              >
                {item.name}
              </a>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}

export function ProfileMobile({
  navigationLinks,
  user,
}: Navigation.Prop.Profile) {
  return (
    <div className="border-t border-typey-secondary pb-3 pt-4">
      <div className="flex items-center px-5 sm:px-6">
        <div className="flex-shrink-0">
          {user.image && (
            <img alt="" src={user.image} className="h-10 w-10 rounded-full" />
          )}
          {!user.image && (
            <DefaultUserIcon className="h-10 w-10 bg-typey-secondary" />
          )}
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-typey-primary">
            {user.username}
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-1 px-2 sm:px-3">
        {navigationLinks.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            href={item.href}
            className="block rounded-md px-3 py-2 text-base font-medium text-typey-primary hover:bg-typey-primary-light hover:text-white"
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </div>
  );
}
