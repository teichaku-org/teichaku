import { HeroTitle } from "@/components/landing-page/HeroTitle";
import { Problems } from "@/components/landing-page/Problems";
import { Container } from "@mantine/core";

const Home = () => {
  return (
    <div>
      <Container>
        <HeroTitle />
        <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSKP4SSpyIQr4w-fALfFCA9QEB_79ICG4hZEQZbz_TBkIvFda4ckj6hsqovAlUnKHZsdcRk54qJDFoa/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        <div style={{ height: 100 }} />
        <Problems />
      </Container>
    </div>
  );
};

Home.noNeedWallet = true;
Home.noNavbar = true;
export default Home;
