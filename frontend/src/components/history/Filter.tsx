import { MultiSelect } from "@mantine/core";

export function Filter() {
  return (
    <MultiSelect
      data={["開発者", "マーケター", "プロダクトマネージャー", "デザイナー"]}
      placeholder="ロール"
      searchable
      nothingFound="Nothing found"
    />
  );
}
