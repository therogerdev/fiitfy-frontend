import { appLink } from "@/config/links";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Role } from "@/types/user";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const { isAuthorized, user } = useAuth();

  return (
    <nav className="flex items-center gap-4 mx-6 text-sm lg:gap-6">
      <Link
        to={appLink.dashboard.href}
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname.startsWith(appLink.dashboard.href)
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        {appLink.dashboard.label}
      </Link>
      {isAuthorized(Role.ADMIN) ? (
        <Link
          to={appLink.athletes().href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(appLink.athletes().href)
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {appLink.athletes().label}
        </Link>
      ) : (
        <Link
          to={`${appLink.athletes().href}/${user?.athlete.id}`}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname.startsWith(appLink.athletes().href)
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {appLink.athletes().label}
        </Link>
      )}
      <Link
        to={appLink.classes().href}
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname.startsWith(appLink.classes().href)
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        {appLink.classes().label}
      </Link>
      <Link
        to={appLink.programs.href}
        className={cn(
          "transition-colors hover:text-foreground/80",
          pathname.startsWith(appLink.programs.href)
            ? "text-foreground"
            : "text-foreground/60"
        )}
      >
        {appLink.programs.label}
      </Link>
    </nav>
  );
};

export default Navbar;
