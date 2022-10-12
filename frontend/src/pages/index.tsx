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
        <p>DAO history</p>
        <Link href="/history" passHref>
          <Button component="a">DAO history</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
