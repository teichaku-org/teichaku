import { HeroTitle } from "@/components/landing-page/HeroTitle";
import { Problems } from "@/components/landing-page/Problems";
import { Container } from "@mantine/core";

const Home = () => {
  return (
    <div>
      <Container>
        <HeroTitle />
        <Problems />
      </Container>
    </div>
  );
};

Home.noNeedWallet = true;
Home.noNavbar = true;
export default Home;
