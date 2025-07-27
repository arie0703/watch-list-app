import React from "react";
import styles from "./system-error.module.scss";

interface SystemErrorProps {
  error: string;
  errorType?: "database" | "network" | "unknown" | null;
  statusCode?: number | null;
  onRetry?: () => void;
}

export const SystemError: React.FC<SystemErrorProps> = ({
  error,
  errorType,
  statusCode,
  onRetry,
}) => {
  return (
    <div className={styles.systemError}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>
          {errorType === "database"
            ? "🗄️"
            : errorType === "network"
            ? "🌐"
            : "⚠️"}
        </div>
        <h2 className={styles.errorTitle}>
          {errorType === "database"
            ? "データベースエラー"
            : errorType === "network"
            ? "ネットワークエラー"
            : "システムエラー"}
        </h2>
        <p className={styles.errorMessage}>{error}</p>
        {statusCode && (
          <p className={styles.statusCode}>ステータスコード: {statusCode}</p>
        )}
        <p className={styles.errorDescription}>
          {errorType === "database"
            ? "データベースに接続できない状態です。しばらく時間をおいてから再度お試しください。"
            : errorType === "network"
            ? "ネットワーク接続に問題があります。インターネット接続を確認してください。"
            : "システムに問題が発生しました。しばらく時間をおいてから再度お試しください。"}
        </p>
        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            再試行
          </button>
        )}
      </div>
    </div>
  );
};
