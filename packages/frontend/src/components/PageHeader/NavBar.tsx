import { DisclosureButton } from "@headlessui/react";
import { classNames } from "../../utils/classNames";

import { Navigation } from "../../types/types";

export function NavBarDesktop({ navigationLinks }: Navigation.Prop.NavBar) {
  return (
    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
      {navigationLinks.map((item) => (
        <a
          key={item.name}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={classNames(
            item.current
              ? "bg-typey-primary text-typey-default"
              : "text-typey-primary hover:bg-typey-primary-light hover:text-white",
            "rounded-md px-3 py-2 text-sm font-medium",
          )}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

export function NavBarMobile({ navigationLinks }: Navigation.Prop.NavBar) {
  return (
    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
      {navigationLinks.map((item) => (
        <DisclosureButton
          key={item.name}
          as="a"
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={classNames(
            item.current
              ? "bg-typey-primary text-typey-default"
              : "text-typey-primary hover:bg-typey-primary-light hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium",
          )}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
  );
}
