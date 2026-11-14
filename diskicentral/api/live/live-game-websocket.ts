import type { LiveGamePoller } from "./live-game-poller";

export interface LiveGameSocket {
  send(data: string): void;
  on(event: "message" | "close" | "error", listener: (...args: unknown[]) => void): unknown;
}

type LiveGameSocketMessage =
  | { type: "subscribe"; fixtureId: number }
  | { type: "unsubscribe"; fixtureId: number };

function parseMessage(raw: unknown): LiveGameSocketMessage | undefined {
  const text = typeof raw === "string" ? raw : raw instanceof Uint8Array ? new TextDecoder().decode(raw) : String(raw);
  let message: unknown;
  try {
    message = JSON.parse(text);
  } catch {
    return undefined;
  }
  if (!message || typeof message !== "object") return undefined;
  const value = message as Record<string, unknown>;
  if ((value.type === "subscribe" || value.type === "unsubscribe") && typeof value.fixtureId === "number") {
    return { type: value.type, fixtureId: value.fixtureId } as LiveGameSocketMessage;
  }
  return undefined;
}

/**
 * Attach a ws-compatible socket. This works with the `ws` package and keeps
 * the API layer independent of a specific WebSocket deployment/runtime.
 */
export function attachLiveGameSocket(socket: LiveGameSocket, poller: LiveGamePoller): () => void {
  const unsubscribers = new Map<number, () => void>();
  const send = (value: unknown) => socket.send(JSON.stringify(value));

  const onMessage = (raw: unknown) => {
    const message = parseMessage(raw);
    if (!message || !Number.isInteger(message.fixtureId) || message.fixtureId <= 0) {
      send({ type: "error", message: "Expected subscribe/unsubscribe with a positive integer fixtureId." });
      return;
    }

    if (message.type === "subscribe") {
      if (!unsubscribers.has(message.fixtureId)) {
        const unsubscribe = poller.subscribe(message.fixtureId, (update) => send(update));
        unsubscribers.set(message.fixtureId, unsubscribe);
      }
      send({ type: "subscribed", fixtureId: message.fixtureId });
      return;
    }

    unsubscribers.get(message.fixtureId)?.();
    unsubscribers.delete(message.fixtureId);
    send({ type: "unsubscribed", fixtureId: message.fixtureId });
  };

  const cleanup = () => {
    for (const unsubscribe of unsubscribers.values()) unsubscribe();
    unsubscribers.clear();
  };

  socket.on("message", onMessage);
  socket.on("close", cleanup);
  socket.on("error", cleanup);
  return cleanup;
}
