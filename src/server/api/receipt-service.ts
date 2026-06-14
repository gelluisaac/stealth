import type { Receipt } from "./domain";
import { ApiError } from "./errors";
import type { ApiRepository } from "./repository";

export async function createDeliveryReceipt(
  repository: ApiRepository,
  input: Pick<Receipt, "messageId" | "recipient" | "sender">,
  now = new Date(),
) {
  if (await repository.getReceipt(input.messageId)) {
    throw new ApiError(409, "conflict", "A delivery receipt already exists for this message");
  }

  return repository.setReceipt({
    ...input,
    deliveredAt: now.toISOString(),
    readAt: null,
  });
}
