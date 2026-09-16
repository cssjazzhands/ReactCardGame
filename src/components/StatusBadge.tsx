import { JSX } from "react";
import styles from "./StatusBadge.module.css";

type Props = {
  status: MissionStatus;
};

const StatusBadge = ({ status }: Props): JSX.Element => {
  return <span className={`${styles.badge} ${styles[status]}`}>{status}</span>;
};

export default StatusBadge;
