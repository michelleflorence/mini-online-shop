import React from 'react'
import styles from "./LoadingContent.module.scss"

const LoadingContent: React.FC = () => {
  return (
    <div>
      <div className={styles["loading-container"]}>
        <div className={styles["loader"]}></div>
        <p>Loading... Please wait...</p>
      </div>
      ;
    </div>
  );
};

export default LoadingContent