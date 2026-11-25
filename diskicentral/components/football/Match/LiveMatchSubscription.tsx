"use client";

import { useEffect, useRef, useState } from "react";
import type { Fixture } from "@/api/types/fixtures.response";
import type { LiveGameSnapshot } from "@/api/live";

export type LiveConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "temporarily_unavailable";

export function LiveMatchSubscription({
  fixtureId,
  initialFixture,
  onSnapshot,
  onSnapshotData,
  onEnded,
}: {
  fixtureId: number;
  initialFixture: Fixture;
  onSnapshot?: (fixture: Fixture) => void;
  onSnapshotData?: (snapshot: LiveGameSnapshot) => void;
  onEnded?: () => void;
}) {
  const [connectionState, setConnectionState] = useState<LiveConnectionState>(
    process.env.NEXT_PUBLIC_LIVE_WS_URL ? "connecting" : "disconnected",
  );
  const reconnectAttempt = useRef(0);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_LIVE_WS_URL;
    let socket: WebSocket | undefined;
    let disposed = false;

    const connect = () => {
      if (disposed || !url) return;
      setConnectionState(reconnectAttempt.current > 0 ? "temporarily_unavailable" : "connecting");
      socket = new WebSocket(url);

      socket.addEventListener("open", () => {
        if (disposed) return;
        reconnectAttempt.current = 0;
        setConnectionState("connected");
        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "subscribe", fixtureId }));
        }
      });
      socket.addEventListener("message", (event) => {
        try {
          const message = JSON.parse(String(event.data)) as
            | LiveGameSnapshot
            | { type: "ended"; fixtureId: number }
            | { type: "error"; fixtureId?: number };
          if (message.fixtureId !== undefined && message.fixtureId !== fixtureId) return;
          if (message.type === "snapshot") {
            onSnapshot?.(message.fixture as unknown as Fixture);
            onSnapshotData?.(message);
          }
          if (message.type === "ended") onEnded?.();
        } catch {
          setConnectionState("temporarily_unavailable");
        }
      });
      socket.addEventListener("close", () => {
        if (disposed) return;
        setConnectionState("temporarily_unavailable");
        reconnectAttempt.current = Math.min(reconnectAttempt.current + 1, 8);
        const baseDelay = Math.min(30_000, 1_000 * 2 ** reconnectAttempt.current);
        const jitter = Math.floor(Math.random() * 500);
        reconnectTimer.current = setTimeout(connect, baseDelay + jitter);
      });
    };

    connect();

    return () => {
      disposed = true;
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "unsubscribe", fixtureId }));
      }
      socket?.close();
    };
  }, [fixtureId, onSnapshot, onSnapshotData, onEnded]);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-surface/70">
      <span
        className={`inline-flex h-2 w-2 rounded-full ${connectionState === "connected" ? "bg-accent" : "bg-surface/30"}`}
      />
      {connectionState === "connected" && "Live updates connected"}
      {connectionState === "connecting" && "Connecting to live updates"}
      {connectionState === "temporarily_unavailable" && "Live updates temporarily unavailable"}
      {connectionState === "disconnected" && "Live updates unavailable"}
      <span className="sr-only">{initialFixture.fixture.status.long}</span>
    </div>
  );
}
