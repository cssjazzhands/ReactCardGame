import { JSX } from "react";
import styles from "./critterCard.module.css";
import RarityBadge from "./RarityBadge";

type Props = {
  critter: CritterIdentity;
};

const CritterCard = ({ critter }: Props): JSX.Element => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titles}>
          <h3 className={styles.fieldName}>{critter.fieldName}</h3>
          <h3 className={styles.latinName}>{critter.latinName}</h3>
        </div>
        <RarityBadge rarity={critter.rarity} />
      </div>
      <div className={styles.imageWrapper}>
        <img src={`images/entries/${critter.id}.jpg`} alt={critter.fieldName} className={styles.image} />
      </div>
      <div className={styles.meta}>
        <span>
          <strong>Tags:</strong> {critter.tags.join(", ")}
        </span>
      </div>
    </div>
  );
};

export default CritterCard;
