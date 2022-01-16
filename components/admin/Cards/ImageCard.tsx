import { getImageName } from "@/utils/images";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image: string;
  onClick: VoidFunction;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => (
  <div className={styles["img-card"]} onClick={onClick}>
    <div className={styles["img-container"]}>
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} width="100%" height="160px" alt="image" />
    </div>

    <div
      className={`${styles["img-name"]} p-2 flex w-full h-auto bg-white flex justify-center items-center`}
    >
      {getImageName(image)}
    </div>
  </div>
);
