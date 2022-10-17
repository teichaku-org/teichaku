import usePoll from "@/hooks/dao/usePoll";
import { Container } from "@mantine/core";
import { useEffect } from "react";

const Poll = () => {
  const { pollDetail } = usePoll();
  return (
    <div>
      <Container>
        <h1>Accepting your votes!</h1>
        <p>
          Evaluate the achievements left by DAO members from the following
          perspectives.
        </p>

        {JSON.stringify(pollDetail)}
      </Container>
    </div>
  );
};
export default Poll;
