import { Navigation } from "../../types/types";
import { NavItem } from "./NavItem";

export function NavBarDesktop({ navigationLinks }: Navigation.Prop.NavBar) {
  return (
    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
      {navigationLinks.map((item) => (
        <NavItem
          key={item.name}
          name={item.name}
          href={item.href}
          current={item.current}
        />
      ))}
    </div>
  );
}

export function NavBarMobile({ navigationLinks }: Navigation.Prop.NavBar) {
  return (
    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
      {navigationLinks.map((item) => (
        <NavItem
          key={item.name}
          name={item.name}
          href={item.href}
          current={item.current}
        />
      ))}
    </div>
  );
}
