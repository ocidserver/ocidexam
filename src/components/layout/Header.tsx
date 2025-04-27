
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuIcon, X } from "lucide-react";
import AuthModal from "../auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const handleLogin = () => {
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Menu items based on authentication status
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Practice Tests', path: '/practice' },
    { name: 'Self Study', path: '/self-study' },
    { name: 'Reports', path: '/reports' },
  ];

  const adminMenuItem = { name: 'Admin', path: '/admin' };

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              English Test Mastery Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-4">
              {user && menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-sm font-medium hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link 
                  to={adminMenuItem.path}
                  className="text-sm font-medium hover:text-secondary"
                >
                  {adminMenuItem.name}
                </Link>
              )}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="hidden md:inline-flex"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button onClick={toggleAuthModal} className="hidden md:inline-flex">
                Sign In
              </Button>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background pt-2 px-4">
            <nav className="flex flex-col space-y-4 p-4">
              {user && menuItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-lg font-medium p-2 hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link 
                  to={adminMenuItem.path}
                  className="text-lg font-medium p-2 hover:bg-muted rounded-md text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {adminMenuItem.name}
                </Link>
              )}
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="mt-4"
                >
                  Sign Out
                </Button>
              ) : (
                <Button 
                  onClick={toggleAuthModal}
                  className="mt-4"
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      {showAuthModal && (
        <AuthModal onClose={toggleAuthModal} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Header;
