import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { ModeToggle } from "./theme-toggle";

type NavLink = {
  title: string;
  href: string;
};
type NavBarType = {
  navLinks: NavLink[];
};
export function Navbar({ navLinks = [] }: NavBarType) {
  return (
    <nav className="w-full h-14 sticky top-0 z-50 lg:px-4 backdrop-filter backdrop-blur-xl bg-opacity-5 border-b">
      <div className="sm:container h-full max-sm:px-3 flex items-center justify-between ">
        <SheetLeftbar />
        <div className="flex items-center gap-9">
          PL Project
          <div className="lg:flex hidden items-center gap-5 text-sm font-medium text-muted-foreground">
            {navLinks.map((item) => {
              return (
                <Anchor
                  key={item.title + item.href}
                  activeClassName="text-primary font-semibold"
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

        <ModeToggle />
      </div>
    </nav>
  );
}
