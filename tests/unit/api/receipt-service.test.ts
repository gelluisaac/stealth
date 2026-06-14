import { describe, expect, it } from "vitest";

import { MemoryApiRepository } from "../../../src/server/api/memory-repository";
import { createDeliveryReceipt } from "../../../src/server/api/receipt-service";

const recipient = `G${"A".repeat(55)}`;
const sender = `G${"B".repeat(55)}`;
const messageId = "a".repeat(64);

describe("receipt service", () => {
  it("creates one sender-authored delivery receipt", async () => {
    const repository = new MemoryApiRepository();
    const input = { messageId, recipient, sender };

    await expect(
      createDeliveryReceipt(repository, input, new Date("2026-06-14T12:00:00.000Z")),
    ).resolves.toEqual({
      deliveredAt: "2026-06-14T12:00:00.000Z",
      messageId,
      readAt: null,
      recipient,
      sender,
    });

    await expect(createDeliveryReceipt(repository, input)).rejects.toMatchObject({ status: 409 });
  });
});
