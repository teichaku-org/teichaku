import type { NextPage } from "next";
import { css } from "@emotion/react";

import attributes from "@/components/HistoryList/attributes.json";
import { HistoryList } from "@/components/HistoryList";

const History: NextPage = () => {
  return <HistoryList data={attributes.props.data} />;
};

export default History;
