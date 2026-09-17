import { useState, useEffect, JSX } from "react";
import styles from "./index.module.css";
import CritterCard from "components/CritterCard";
import TechStackModal from "pages/testroute";
import { getCritterStats } from "utils/utils";
import { CRITTER_RARITIES } from "utils/critters-data";

const FILTERS = ["all", ...CRITTER_RARITIES];
type Filter = (typeof FILTERS)[number];

type ApiEntry = { endpoint: string; status: number; ms: number };

const HomePage = (): JSX.Element => {
  const [critters, setCritters] = useState<CritterType[]>([]);
  const [versionInfo, setVersionInfo] = useState<RespExampleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [apiLog, setApiLog] = useState<ApiEntry[]>([]);
  const [rawResponses, setRawResponses] = useState<Record<string, string>>({});
  const [expandedRaw, setExpandedRaw] = useState<Set<number>>(new Set());
  const [showStack, setShowStack] = useState(false);

  useEffect(() => {
    async function loadData() {
      const t0 = Date.now();
      try {
        const [crittersRes, versionRes] = await Promise.all([
          fetch("/api/v1/critters"),
          fetch("/api/v1/version"),
        ]);
        const ms = Date.now() - t0;
        const crittersData: CritterType[] = await crittersRes.json();
        const versionData: RespExampleType = await versionRes.json();
        setCritters(crittersData);
        setVersionInfo(versionData);
        setApiLog([
          { endpoint: "/api/v1/critters", status: crittersRes.status, ms },
          { endpoint: "/api/v1/version", status: versionRes.status, ms },
        ]);
        setRawResponses({
          "/api/v1/missions": JSON.stringify(crittersData, null, 2),
          "/api/v1/version": JSON.stringify(versionData, null, 2),
        });
      } catch {
        setError("Failed to load data. Is the API server running?");
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  function toggleRaw(i: number) {
    setExpandedRaw((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const stats = getCritterStats(critters, CRITTER_RARITIES as CritterRarity[]);
  const filtered = filter === "all" ? critters : critters.filter((c) => c.rarity === filter);

  return (
    <div className={styles.page}>
      <div className={styles["demo-banner"]}>
        ⚠ Demo Application — Sample data only. Not affiliated with or endorsed by NASA.
      </div>
      <header className={styles.header}>
        <img src="/images/nasa-logo.svg" alt="NASA logo" className={styles.logo} />
        <div>
          <h1 className={styles.title}>Mission Tracker</h1>
          <p className={styles.subtitle}>NASA Active &amp; Upcoming Missions</p>
        </div>
        <button className={styles["nav-btn"]} onClick={() => setShowStack(true)}>
          Tech Stack ↗
        </button>
      </header>

      {loading && <p className={styles.loading}>Loading missions…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <section className={styles["api-panel"]}>
            <div className={styles["api-panel-title"]}>API calls</div>
            <div className={styles["api-log"]}>
              {apiLog.map((entry, i) => (
                <div key={entry.endpoint} className={styles["api-entry"]}>
                  <div className={styles["api-entry-row"]}>
                    <span className={styles["api-method"]}>GET</span>
                    <code className={styles["api-endpoint"]}>{entry.endpoint}</code>
                    <span className={styles["api-status-ok"]}>{entry.status} OK</span>
                    <span className={styles["api-ms"]}>{entry.ms}ms</span>
                    <button className={styles["api-raw-btn"]} onClick={() => toggleRaw(i)}>
                      {expandedRaw.has(i) ? "▾ raw" : "▸ raw"}
                    </button>
                  </div>
                  {expandedRaw.has(i) && (
                    <pre className={styles["api-raw"]}>
                      {rawResponses[entry.endpoint]?.slice(0, 600)}
                      {(rawResponses[entry.endpoint]?.length ?? 0) > 600 && "\n…"}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </section>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles["stat-value"]}>{stats.total}</span>
              <span className={styles["stat-label"]}>Total</span>
            </div>
            <div className={`${styles.stat} ${styles["stat-active"]}`}>
              <span className={styles["stat-value"]}>{stats.active}</span>
              <span className={styles["stat-label"]}>Active</span>
            </div>
            <div className={`${styles.stat} ${styles["stat-completed"]}`}>
              <span className={styles["stat-value"]}>{stats.completed}</span>
              <span className={styles["stat-label"]}>Completed</span>
            </div>
            <div className={`${styles.stat} ${styles["stat-planned"]}`}>
              <span className={styles["stat-value"]}>{stats.planned}</span>
              <span className={styles["stat-label"]}>Planned</span>
            </div>
          </div>

          <div className={styles.filters}>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles["filter-btn"]} ${filter === f ? styles["filter-btn-active"] : ""}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map((critter) => (
              <CritterCard key={critter.id} critter={critter} />
            ))}
          </div>

          {versionInfo && (
            <footer className={styles.footer}>
              <span>v{versionInfo.version}</span>
            </footer>
          )}
        </>
      )}
      {showStack && <TechStackModal onClose={() => setShowStack(false)} />}
    </div>
  );
};

export default HomePage;
