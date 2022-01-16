export function getImageName(imageSrc: string): string | undefined {
  return imageSrc.split("/").pop();
}
