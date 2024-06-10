import Filter from "../../components/filter/Filter";
import HeroSection from "../../components/herosection/HeroSection";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/productcard/ProductCard";
import Testimonials from "../../components/testimonials/Testimonials";
import Track from "../../components/track/Track";


const Home=()=>{
    return(
    <>
        <Layout>
            <HeroSection />
            <Filter />
            <ProductCard />
            <Track />
            <Testimonials />
        </Layout>
    </>
    )
}

export default Home;