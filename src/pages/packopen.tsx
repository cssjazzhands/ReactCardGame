import { JSX, useEffect, useState } from "react";
import styles from "./packopen.module.css";

type Props = { onClose: () => void };

const PackOpenModal = ({ onClose }: Props): JSX.Element => {
  const [pack, setPack] = useState<CritterIdentity[]>([]);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handler);
      async function loadCritterPack() {
        try {
          const packRes = await Promise.resolve(fetch("/api/v1/pack"));
          const packData: CritterIdentity[] = await packRes.json();
          setPack(packData);
        } catch (error) {
          console.error("Failed to load critter pack:", error);
        } finally {
          setLoading(false);
        }
      }
      void loadCritterPack();
      return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

  return (
    <div className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.modal}>
        <button className={styles["close-btn"]} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles["leaf-overlay"]}></div>
      <p>Pack Open Modal</p>
      <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PackOpenModal;
