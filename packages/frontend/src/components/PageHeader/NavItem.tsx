import { DisclosureButton } from "@headlessui/react";
import { Link } from "react-router-dom";

import { classNames } from "../../utils/classNames";
import { Navigation } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export function NavItem({ navigationLink }: Navigation.Prop.NavItem) {
  const currentPage = useSelector(
    (state: RootState) => state.location.currentPage,
  );

  const current = navigationLink.name === currentPage;

  const className = classNames(
    current
      ? "bg-typey-primary text-typey-default"
      : "text-typey-primary hover:bg-typey-primary-light hover:text-white",
    "block rounded-md px-3 py-2 text-base font-medium",
  );

  if ("href" in navigationLink) {
    return (
      <DisclosureButton
        as={Link}
        to={navigationLink.href}
        aria-current={current ? "page" : undefined}
        className={className}
      >
        {navigationLink.text}
      </DisclosureButton>
    );
  }
  if ("onClick" in navigationLink) {
    return (
      <DisclosureButton
        as="div"
        onClick={navigationLink.onClick}
        className={classNames(className, "cursor-pointer")}
      >
        {navigationLink.text}
      </DisclosureButton>
    );
  }
}

type NavItemMapProp = {
  navigationLinks: (Navigation.NavigationLink | Navigation.NavigationButton)[];
};

export function NavItemMap({ navigationLinks }: NavItemMapProp) {
  return (
    <>
      {navigationLinks.map((item) => (
        <NavItem navigationLink={item} key={item.name} />
      ))}
    </>
  );
}
