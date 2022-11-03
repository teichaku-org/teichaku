import { HeroTitle } from "@/components/landing-page/HeroTitle";
import { Problems } from "@/components/landing-page/Problems";
import { css } from "@emotion/react";
import { Container } from "@mantine/core";

const Home = () => {
  return (
    <div>
      <Container>
        <HeroTitle />

        <div css={css`
        position: relative;
        width: 100%;
        padding-top: 60%;
        overflow: hidden;`} >
          <iframe css={
            css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;`
          } src="https://docs.google.com/presentation/d/e/2PACX-1vSKP4SSpyIQr4w-fALfFCA9QEB_79ICG4hZEQZbz_TBkIvFda4ckj6hsqovAlUnKHZsdcRk54qJDFoa/embed?start=false&loop=false&delayms=3000" frameBorder="0" allowFullScreen={true} ></iframe>
        </div>
        <div style={{ height: 100 }} />
        {/* <Problems /> */}
      </Container>
    </div>
  );
};

Home.noNeedWallet = true;
Home.noNavbar = true;
export default Home;
