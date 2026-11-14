import type { LiveGameListener, LiveGameUpdate } from "./live-game.types";

export class LiveGameBroadcaster {
  private readonly listeners = new Map<number, Set<LiveGameListener>>();

  subscribe(fixtureId: number, listener: LiveGameListener): () => void {
    const fixtureListeners = this.listeners.get(fixtureId) ?? new Set();
    fixtureListeners.add(listener);
    this.listeners.set(fixtureId, fixtureListeners);

    return () => {
      fixtureListeners.delete(listener);
      if (fixtureListeners.size === 0) {
        this.listeners.delete(fixtureId);
      }
    };
  }

  publish(update: LiveGameUpdate): void {
    if (update.fixtureId === undefined) {
      for (const fixtureListeners of this.listeners.values()) {
        for (const listener of fixtureListeners) listener(update);
      }
      return;
    }

    for (const listener of this.listeners.get(update.fixtureId) ?? []) {
      listener(update);
    }
  }

  subscriberCount(fixtureId?: number): number {
    if (fixtureId !== undefined) return this.listeners.get(fixtureId)?.size ?? 0;
    let count = 0;
    for (const fixtureListeners of this.listeners.values()) count += fixtureListeners.size;
    return count;
  }
}
