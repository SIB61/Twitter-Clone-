import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/utils.css";
import { SessionProvider } from "next-auth/react";
import { useEffect  } from "react";
import { Router, useRouter } from "next/router";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SocketProvider } from "@/components/providers/SocketProvider";
import { MessageProvider } from "@/components/providers/MessageProvider";
import { LoadingBar } from "@/components/common/loading-bar/LoadingBar";
import { useLoading } from "@/hooks/useLoading";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const loading = useLoading();

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      loading.start();
    });
    Router.events.on("routeChangeComplete", (url) => {
      loading.complete();
    });
    Router.events.on("routeChangeError", (url) => {
      loading.complete();
    });
  }, [Router]);

  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <ModalProvider>
        <ToastProvider>
          <SocketProvider>
            <MessageProvider>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  zIndex: 10,
                }}
              >
                <LoadingBar loading={loading.loading} />
              </div>
              <Component {...pageProps} key={router.asPath} />
            </MessageProvider>
          </SocketProvider>
        </ToastProvider>
      </ModalProvider>
    </SessionProvider>
  );
}
