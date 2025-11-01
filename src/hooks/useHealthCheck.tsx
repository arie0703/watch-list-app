import { useState, useEffect } from "react";

interface HealthCheckResponse {
  message: string;
  status: number;
  error?: string;
}

interface HealthCheckState {
  isHealthy: boolean;
  isLoading: boolean;
  error: string | null;
  errorType: "database" | "network" | "unknown" | null;
  statusCode: number | null;
}

export const useHealthCheck = () => {
  const [state, setState] = useState<HealthCheckState>({
    isHealthy: true,
    isLoading: true,
    error: null,
    errorType: null,
    statusCode: null,
  });

  const checkHealth = async () => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        errorType: null,
        statusCode: null,
      }));

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-check`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        // HTTPエラーの詳細情報をコンソールに出力
        console.error("HTTP error from health-check:", {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          timestamp: new Date().toISOString(),
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HealthCheckResponse = await response.json();

      if (data.status === 200) {
        setState({
          isHealthy: true,
          isLoading: false,
          error: null,
          errorType: null,
          statusCode: null,
        });
      } else {
        // データベースエラーの詳細情報をコンソールに出力
        console.error("Database error from health-check:", {
          status: data.status,
          message: data.message,
          error: data.error,
          timestamp: new Date().toISOString(),
        });

        setState({
          isHealthy: false,
          isLoading: false,
          error: data.message || "システムエラーが発生しました",
          errorType: "database",
          statusCode: data.status,
        });
      }
    } catch (error) {
      // エラーオブジェクトの型を安全に処理
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      const errorType = error?.constructor?.name || "Unknown";

      // ネットワークエラーかどうかを判定
      const isNetworkError =
        error instanceof TypeError &&
        (errorMessage.includes("fetch") || errorMessage.includes("network"));

      // エラーの詳細情報をコンソールに出力
      console.error("Health check error:", {
        type: errorType,
        message: errorMessage,
        stack: errorStack,
        isNetworkError,
        timestamp: new Date().toISOString(),
      });

      setState({
        isHealthy: false,
        isLoading: false,
        error: isNetworkError
          ? "ネットワーク接続エラー"
          : "予期しないエラーが発生しました",
        errorType: isNetworkError ? "network" : "unknown",
        statusCode: null,
      });
    }
  };

  useEffect(() => {
    checkHealth();

    // 定期的にヘルスチェックを実行（5分間隔）
    // const interval = setInterval(checkHealth, 5 * 60 * 1000);
    // return () => clearInterval(interval);
  }, []);

  return {
    ...state,
    refetch: checkHealth,
  };
};
