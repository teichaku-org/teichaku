import { Features } from "@/components/landing-page/Features";
import { HeroTitle } from "@/components/landing-page/HeroTitle";

const Home = () => {
  return (
    <div>
      <HeroTitle />
      <Features />
    </div>
  );
};

Home.noNeedWallet = true
Home.noNavbar = true
export default Home;
