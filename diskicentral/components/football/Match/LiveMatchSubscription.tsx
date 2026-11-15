"use client";

import { useEffect, useState } from "react";
import type { Fixture } from "@/api/types/fixtures.response";

type Snapshot =
  | {
      type: "snapshot";
      fixtureId: number;
      fixture: Fixture;
      updatedAt: string;
    }
  | { type: "ended" | "error"; fixtureId: number; message?: string; updatedAt: string };

export function LiveMatchSubscription({
  fixtureId,
  initialFixture,
}: {
  fixtureId: number;
  initialFixture: Fixture;
}) {
  const [fixture, setFixture] = useState(initialFixture);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_LIVE_WS_URL;
    if (!url) return;

    const socket = new WebSocket(url);
    const subscribe = () =>
      socket.send(JSON.stringify({ type: "subscribe", fixtureId }));

    socket.addEventListener("open", () => {
      setConnected(true);
      subscribe();
    });
    socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(String(event.data)) as Snapshot;
        if (message.type === "snapshot" && message.fixtureId === fixtureId) {
          setFixture(message.fixture);
        }
      } catch {
        // Ignore malformed messages from a disconnected transport.
      }
    });
    socket.addEventListener("close", () => setConnected(false));

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "unsubscribe", fixtureId }));
      }
      socket.close();
    };
  }, [fixtureId]);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-surface/70">
      <span
        className={`inline-flex h-2 w-2 rounded-full ${connected ? "bg-accent" : "bg-surface/30"}`}
      />
      {connected ? "Live updates connected" : "Live updates unavailable"}
      <span className="sr-only">{fixture.fixture.status.long}</span>
    </div>
  );
}
