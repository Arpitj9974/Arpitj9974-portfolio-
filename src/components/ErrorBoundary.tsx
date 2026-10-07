import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary caught error]:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.hash = "";
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper text-ink flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full border border-ink/15 bg-surface-container p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>INTERFACE RECOVERY GUARD</span>
            </div>
            
            <h2 className="font-serif text-2xl font-bold tracking-tight text-ink">
              Operational Session Restored
            </h2>
            
            <p className="text-xs text-muted leading-relaxed font-sans">
              A runtime navigation state was cleanly intercepted. The system is ready to reload into the primary executive overview.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 font-mono text-xs">
              <button
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 bg-ink text-paper hover:bg-accent transition-colors font-bold uppercase tracking-wider cursor-pointer"
              >
                Reload Overview
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.hash = "";
                }}
                className="w-full py-2.5 px-4 border border-ink/20 hover:border-ink transition-colors font-bold uppercase tracking-wider cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
