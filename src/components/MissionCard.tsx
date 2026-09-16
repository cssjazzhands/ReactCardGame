import { JSX } from "react";
import styles from "./MissionCard.module.css";
import StatusBadge from "components/StatusBadge";
import { formatDate, formatLaunchAge } from "utils/utils";

type Props = {
  mission: MissionType;
};

const MissionCard = ({ mission }: Props): JSX.Element => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{mission.name}</h3>
        <StatusBadge status={mission.status} />
      </div>
      <p className={styles.description}>{mission.description}</p>
      <div className={styles.meta}>
        <span>
          <strong>Target:</strong> {mission.target}
        </span>
        <span>
          <strong>Launched:</strong> {formatDate(mission.launchDate)} &middot;{" "}
          {formatLaunchAge(mission.launchDate)}
        </span>
      </div>
    </div>
  );
};

export default MissionCard;
