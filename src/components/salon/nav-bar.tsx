"use client";

import { usePathname } from "next/navigation";
import Anchor from "../anchor";

type NavLink = {
  title: string;
  href: string;
};
type NavBarType = {
  navLinks: NavLink[];
};
export function SalonBar({ navLinks = [] }: NavBarType) {
  const route = usePathname();
  return (
    <nav className="relative isolate overflow-hidden w-screen h-16 lg:h-14 sticky top-[55px] z-50 lg:px-4 backdrop-filter backdrop-blur-xl bg-opacity-5 max-w-screen">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        ></div>
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        ></div>
      </div>
      <div className="sm:container h-full max-sm:px-3 flex items-center justify-between ">
        <div className="flex items-center gap-9">
          <div className="p-2 flex flex-row flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground overflow-x-auto">
            {navLinks.map((item) => {
              const isActive = route === item.href;
              return (
                <Anchor
                  key={item.title + item.href}
                  activeClassName={` ${
                    isActive && " text-primary font-extrabold"
                  }`}
                  absolute
                  className="flex items-center gap-1"
                  href={item.href}
                >
                  {item.title}
                </Anchor>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
