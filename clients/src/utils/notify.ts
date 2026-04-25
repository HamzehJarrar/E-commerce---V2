export type AppNoticeType = "success" | "error" | "info" | "warning";

export interface AppNoticeDetail {
  message: string;
  type?: AppNoticeType;
}

export const notify = (message: string, type: AppNoticeType = "info") => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<AppNoticeDetail>("app-notify", {
      detail: { message, type },
    }),
  );
};
