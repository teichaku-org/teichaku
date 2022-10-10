import { Button } from "@mantine/core";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <p>トークン総発行数</p>
        <Link href="/test" passHref>
          <Button component="a">トークン総発行数</Button>
        </Link>
      </div>

      <div>
        <p>ランキング</p>
        <Link href="/ranking" passHref>
          <Button component="a">ランキング</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
