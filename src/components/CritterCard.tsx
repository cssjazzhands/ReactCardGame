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
        <h3 className={styles.name}>{critter.fieldName}</h3>
        <h3 className={styles.name}>{critter.latinName}</h3>
        <RarityBadge rarity={critter.rarity} />
      </div>
      <img src={`images/entries/${critter.id}.jpg`} alt={critter.fieldName} className={styles.image} />
      <div className={styles.meta}>
        <span>
          <strong>Tags:</strong> {critter.tags.join(", ")}
        </span>
      </div>
    </div>
  );
};

export default CritterCard;
