import { Drawer } from "@mantine/core";

interface Props {
  opened: boolean;
  onClose: () => void;
}

export function HistoryDrawer(props: Props) {
  const { opened, onClose } = props;
  return (
    <>
      <Drawer
        opened={opened}
        onClose={onClose}
        title="Register"
        padding="xl"
        size="xl"
        position="right"
        withOverlay={false}
        lockScroll={false}
      >
        {/* content */}
      </Drawer>
    </>
  );
}
