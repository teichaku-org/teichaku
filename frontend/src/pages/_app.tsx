import { AppFooter } from "@/components/common/AppFooter";
import { AppHeader } from "@/components/common/AppHeader";
import { AppNavbar } from "@/components/common/AppNavbar";
import { AppInfo } from "@/constants/AppInfo";
import { AppShell, MantineProvider } from "@mantine/core";
import dynamic from "next/dynamic";
import NetworkCheck from "../components/web3/common/NetworkCheck";
import { NotificationsProvider } from '@mantine/notifications';
import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState } from "react";
import { InformationModals } from "@/components/modals/InformationModals";


const MyApp = ({ Component, pageProps }: any) => {
  const SafeHydrate = dynamic(() => import("./SafeHydrage"), { ssr: false });


  const windowErrorRender = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold">
          このページを開くことはできません(お問い合わせをお願いします)
        </div>
      </div>
    );
  };

  const render = () => {
    return (
      <div>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "dark",
            fontFamily: "Open Sans, sans serif",
            shadows: {
              xs: "-1px 1px 4px #BE4BDB, 1px -1px 4px #228BE6",
              sm: "-1px 1px 5px 2px #BE4BDB, 2px -2px 5px 2px #228BE6",
              md: "-3px 3px 5px 2px #BE4BDB, 3px -3px 5px 2px #228BE6",
              lg: "-5px 5px 10px 3px #BE4BDB, 5px -5px 10px  3px #228BE6",
              xl: "-8px 8px 70px 5px #BE4BDB, 8px -8px 70px 5px #228BE6",
            },
            components: {
              Text: {
                defaultProps: {
                  color: "white",
                },
              },
            },
          }}
        >
          <NotificationsProvider>
            <AppShell
              padding="md"
              navbarOffsetBreakpoint={"md"}
              navbar={!Component.noNavbar ? <AppNavbar /> : undefined}
              header={<AppHeader />}
              footer={Component.noNavbar ? <AppFooter /> : undefined}
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              {/* パスが/である場合は表示する */}
              {!Component.noNeedWallet && (
                <>
                  <NetworkCheck />
                </>
              )}
              <Component {...pageProps} />
            </AppShell>
            <InformationModals/>
          </NotificationsProvider>
        </MantineProvider>
      </div>
    );
  };

  return (
    <SafeHydrate>
      <title>{AppInfo.name}</title>
      {typeof window === "undefined" ? windowErrorRender() : render()}
    </SafeHydrate>
  );
};

export default MyApp;
