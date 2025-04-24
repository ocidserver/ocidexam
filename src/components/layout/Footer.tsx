
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            English Test Mastery Hub
          </h3>
          <p className="text-sm text-muted-foreground">
            Your guide to TOEFL ITP and IELTS success
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/practice" className="hover:underline">
                  Practice Tests
                </Link>
              </li>
              <li>
                <Link to="/self-study" className="hover:underline">
                  Self Study
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2 col-span-2 md:col-span-1">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mt-6 pt-6 border-t">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} English Test Mastery Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
