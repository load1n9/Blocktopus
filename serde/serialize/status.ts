import { ErrorKind, ServerError } from "@/error.ts";
import type {
  PingResponse,
  StatusPayloads,
  StatusResponse,
} from "@client_payloads/mod.ts";
import type { Packet } from "@/types/mod.ts";
import type { Writer } from "@/util/writer.ts";

export function serializeStatusPackets(
  writer: Writer,
  packet: Packet<StatusPayloads>,
): void {
  if (packet.packedID < 0 || packet.packedID > 1) {
    throw new ServerError(ErrorKind.Deserialization, "Unknown Packet ID");
  }

  if (packet.packedID === 0) {
    writer.setString((packet as StatusResponse).JsonResponse);
    return;
  }

  writer.setBigUint64((packet as PingResponse).payload);
}
