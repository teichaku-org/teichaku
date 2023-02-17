import { HeroTitle } from "@/components/landing-page/HeroTitle";
import { Problems } from "@/components/landing-page/Problems";
import useWeb3Auth from "@/hooks/web3/useWeb3Auth";
import { useLocale } from "@/i18n/useLocale";
import { css } from "@emotion/react";
import { Container } from "@mantine/core";
import { json } from "stream/consumers";


const Home = () => {

  const { address } = useWeb3Auth()

  const { locale } = useLocale()
  const slideUrl = () => {
    if (locale === "ja") {
      return "https://docs.google.com/presentation/d/e/2PACX-1vQGSG-wIPSSjb2_K60-s3I49EkB5UHtYx8HWCloe3k-y6HuwDZCyunx2nhgbJ9FDdtTz-To4KYPRSCa/embed?start=false&loop=false&delayms=3000"
    } else {
      return "https://docs.google.com/presentation/d/e/2PACX-1vQTBuhIEd3XYNfR2i16K2q1Mh0TFTZOVneClWKd9mmZxXiFq7uP7jA6IbWMJj4SpOXL-k8-u6NI2nzO/embed?start=false&loop=false&delayms=3000"
    }
  }

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
          } src={slideUrl()} frameBorder="0" allowFullScreen={true} ></iframe>
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
