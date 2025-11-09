import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import wildwatchLogo from "@/assets/wildwatch-logo.png";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Startseite" },
    { path: "/species", label: "Tierarten" },
    { path: "/cameras", label: "Kameras" },
    { path: "/identification", label: "Identifikation" },
    { path: "/about", label: "Über uns" },
    { path: "/biodiversity", label: "Biodiversität" },

  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <img src={wildwatchLogo} alt="WILDWATCH Logo" className="w-10 h-10" />
              <span>WILDWATCH</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <Button variant="default" size="sm">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
