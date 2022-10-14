import { Features } from "@/components/landing-page/Features";
import { HeroTitle } from "@/components/landing-page/HeroTitle";
import { Problems } from "@/components/landing-page/Problems";

const Home = () => {
  return (
    <div>
      <HeroTitle />
      <Problems />
    </div>
  );
};

Home.noNeedWallet = true
Home.noNavbar = true
export default Home;
