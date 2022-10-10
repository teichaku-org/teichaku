import type { NextPage } from "next";
import { css } from "@emotion/react";

import { TableSort } from "@/components/TableSort";
import attributes from "@/components/TableSort/attributes.json";
import useDaoHistory from "@/hooks/dao/useDaoHistory";

const Ranking: NextPage = () => {
  const { daoHistory } = useDaoHistory()
  return (
    <div
      css={css`
        margin: 32px 300px;
      `}
    >
      <TableSort data={daoHistory} />
    </div>
  );
};

export default Ranking;
