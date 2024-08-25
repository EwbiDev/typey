import { DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function HamburgerMenu() {
  return (
    <div className="-ml-2 mr-2 flex items-center md:hidden">
      {/* Mobile menu button */}
      <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-typey-primary hover:bg-typey-primary-light hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-typey-secondary">
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        <Bars3Icon
          aria-hidden="true"
          className="block h-6 w-6 group-data-[open]:hidden"
        />
        <XMarkIcon
          aria-hidden="true"
          className="hidden h-6 w-6 group-data-[open]:block"
        />
      </DisclosureButton>
    </div>
  );
}