import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  DisclosureButton,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { DefaultUserIcon } from "../Icons";
import { NavItem } from "./NavItem";
import { GradientLoader } from "../Loader";

import { classNames } from "../../utils/classNames";
import { RootState } from "../../app/store";

import { Navigation } from "../../types/types";

export function ProfileDesktop({ navigationLinks }: Navigation.Prop.Profile) {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth.loading) {
    return (
      <GradientLoader className="hidden h-12 w-12 rounded-full md:block" />
    );
  }

  return (
    <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
      {!auth.user && (
        <>
          <NavItem name="Register" href="/register" current={false} />
          <NavItem name="Log in" href="/login" current={false} />
        </>
      )}

      {/* Profile dropdown */}
      {auth.user && (
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="relative flex rounded-full bg-typey-primary text-sm focus:outline-none focus:ring-2 focus:ring-typey-secondary focus:ring-offset-2">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              {auth.user?.image && (
                <img
                  alt=""
                  src={auth.user.image}
                  className="h-12 w-12 rounded-full"
                />
              )}
              {!auth.user?.image && (
                <DefaultUserIcon className="h-12 w-12 bg-typey-secondary" />
              )}
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {navigationLinks.map((item) => {
              const className =
                "block px-4 py-2 text-sm text-typey-primary data-[focus]:bg-typey-primary-light data-[focus]:text-white";
              if (item.href) {
                return (
                  <MenuItem key={item.name}>
                    <Link to={item.href} className={className}>
                      {item.name}
                    </Link>
                  </MenuItem>
                );
              }

              if (item.onClick) {
                return (
                  <MenuItem key={item.name}>
                    <div
                      className={classNames(className, "cursor-pointer")}
                      onClick={item.onClick}
                    >
                      {item.name}
                    </div>
                  </MenuItem>
                );
              }
            })}
          </MenuItems>
        </Menu>
      )}
    </div>
  );
}

export function ProfileMobile({ navigationLinks }: Navigation.Prop.Profile) {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <div className="space-y-3 border-t border-typey-secondary py-3">
      {auth.user && (
        <div className="flex items-center px-5 sm:px-6">
          <div className="flex-shrink-0">
            {auth?.user?.image && (
              <img
                alt=""
                src={auth.user.image}
                className="h-12 w-12 rounded-full"
              />
            )}
            {!auth?.user?.image && (
              <DefaultUserIcon className="h-12 w-12 bg-typey-secondary" />
            )}
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-typey-primary">
              {auth?.user?.username}
            </div>
          </div>
        </div>
      )}
      <div className="space-y-1 px-2 sm:px-3">
        {navigationLinks.map((item) => {
          const className =
            "block rounded-md px-3 py-2 text-base font-medium text-typey-primary hover:bg-typey-primary-light hover:text-white";
          if (item.href) {
            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={className}
              >
                {item.name}
              </DisclosureButton>
            );
          }

          if (item.onClick) {
            return (
              <DisclosureButton
                key={item.name}
                as="div"
                onClick={item.onClick}
                className={classNames(className, "cursor-pointer")}
              >
                {" "}
                {item.name}
              </DisclosureButton>
            );
          }
        })}
      </div>
    </div>
  );
}
