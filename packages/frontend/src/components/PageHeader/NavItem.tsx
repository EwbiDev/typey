import { DisclosureButton } from "@headlessui/react";
import { Link } from "react-router-dom";

import { classNames } from "../../utils/classNames";
import { Navigation } from "../../types/types";

export function NavItem({ href, current, name }: Navigation.NavigationLink) {
  return (
    <DisclosureButton
      as={Link}
      to={href}
      aria-current={current ? "page" : undefined}
      className={classNames(
        current
          ? "bg-typey-primary text-typey-default"
          : "text-typey-primary hover:bg-typey-primary-light hover:text-white",
        "block rounded-md px-3 py-2 text-base font-medium",
      )}
    >
      {name}
    </DisclosureButton>
  );
}

type NavItemMapProp = {
  navigationLinks: Navigation.NavigationLink[];
};

export function NavItemMap({ navigationLinks }: NavItemMapProp) {
  return (
    <>
      {navigationLinks.map((item) => (
        <NavItem
          key={item.name}
          name={item.name}
          href={item.href}
          text={item.text}
        />
      ))}
    </>
  );
}
