import Header from "./Header";
import Footer from "./Footer";
const MainLayout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto px-10 md:px-16 lg:px-32 ">
        <Header />
        {children}
      </div>
        <Footer />
    </>
  );
};

export default MainLayout;
