import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  easing: "ease",
  speed: 300,
});

export async function fetchWithProgress(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  NProgress.start();
  try {
    const response = await fetch(input, init);
    NProgress.done();
    return response;
  } catch (error) {
    NProgress.done();
    throw error;
  }
}
