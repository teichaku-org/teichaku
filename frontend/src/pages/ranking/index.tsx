import type { NextPage } from "next";
import { css } from "@emotion/react";

import { TableSort } from "@/components/TableSort";
import attributes from "@/components/TableSort/attributes.json";

const Ranking: NextPage = () => {
  return (
    <div
      css={css`
        margin: 32px 300px;
      `}
    >
      <TableSort data={attributes.props.data} />
    </div>
  );
};

export default Ranking;
