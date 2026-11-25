import { describe, expect, it } from "vitest";
import { attachLiveGameSocket, type LiveGameSocket } from "./live-game-websocket";
import { LiveGamePoller } from "./live-game-poller";

class MockSocket implements LiveGameSocket {
  sent: unknown[] = [];
  private listeners = new Map<string, (...args: unknown[]) => void>();

  send(data: string): void {
    this.sent.push(JSON.parse(data));
  }

  on(event: "message" | "close" | "error", listener: (...args: unknown[]) => void): unknown {
    this.listeners.set(event, listener);
    return undefined;
  }

  emit(event: "message" | "close" | "error", value?: unknown): void {
    this.listeners.get(event)?.(value);
  }
}

describe("live WebSocket adapter", () => {
  it("validates malformed and unsupported messages", () => {
    const socket = new MockSocket();
    const poller = new LiveGamePoller();
    attachLiveGameSocket(socket, poller);

    socket.emit("message", "{");
    socket.emit("message", JSON.stringify({ type: "watch", fixtureId: 10 }));

    expect(socket.sent).toEqual([
      expect.objectContaining({ type: "error" }),
      expect.objectContaining({ type: "error" }),
    ]);
  });

  it("prevents duplicate subscriptions and cleans up on disconnect", () => {
    const socket = new MockSocket();
    const poller = new LiveGamePoller();
    attachLiveGameSocket(socket, poller);

    socket.emit("message", JSON.stringify({ type: "subscribe", fixtureId: 42 }));
    socket.emit("message", JSON.stringify({ type: "subscribe", fixtureId: 42 }));
    expect(poller.status.subscriberCount).toBe(1);
    expect(socket.sent).toHaveLength(2);

    socket.emit("close");
    expect(poller.status.subscriberCount).toBe(0);
  });

  it("rejects invalid fixture IDs and unsubscribes valid fixtures", () => {
    const socket = new MockSocket();
    const poller = new LiveGamePoller();
    attachLiveGameSocket(socket, poller);

    socket.emit("message", JSON.stringify({ type: "subscribe", fixtureId: 0 }));
    socket.emit("message", JSON.stringify({ type: "subscribe", fixtureId: 7 }));
    socket.emit("message", JSON.stringify({ type: "unsubscribe", fixtureId: 7 }));

    expect(socket.sent).toEqual([
      expect.objectContaining({ type: "error" }),
      expect.objectContaining({ type: "subscribed", fixtureId: 7 }),
      expect.objectContaining({ type: "unsubscribed", fixtureId: 7 }),
    ]);
  });
});
