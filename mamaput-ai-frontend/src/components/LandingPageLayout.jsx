// Layout for the landing pages
import PropTypes from "prop-types";
import Navbar from "./Navbar";


const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Layout;
