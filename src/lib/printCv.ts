// The CV photo only appears in the printed CV, so it is downloaded on demand
// instead of on every page visit.
export const CV_PHOTO = "/cv-photo.jpg";

let loading: Promise<void> | null = null;

export function loadCvPhoto(): Promise<void> {
  loading ??= new Promise<void>((resolve) => {
    const img = document.querySelector<HTMLImageElement>("img[data-cv-photo]");
    if (!img) return resolve();
    img.onload = img.onerror = () => resolve();
    img.src = CV_PHOTO;
    if (img.complete) resolve();
  });
  return loading;
}

export async function printCv() {
  await loadCvPhoto();
  window.print();
}
