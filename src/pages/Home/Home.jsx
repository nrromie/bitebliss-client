import AboutUsSection from "../../Components/AboutUsSection/AboutUsSection";
import Banner from "../../Components/Banner/Banner";
import FeaturedBrands from "../../Components/FeaturedBrands/FeaturedBrands";
import SpecialOffers from "../../Components/SpecialOffers/SpecialOffers";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedBrands></FeaturedBrands>
            <SpecialOffers></SpecialOffers>
            <AboutUsSection></AboutUsSection>
        </div>
    );
};

export default Home;