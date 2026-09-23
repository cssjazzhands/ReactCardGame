import { JSX } from "react";
import styles from "./RarityBadge.module.css";

type Props = {
  rarity: CritterRarity;
};

const RarityBadge = ({ rarity }: Props): JSX.Element => {
  return <span className={`${styles.badge} ${styles[rarity]}`}>{rarity}</span>;
};

export default RarityBadge;
