import { Request } from "express";

export interface ApplicationRequest<
  T = unknown,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = unknown
> extends Request<T, ResBody, ReqBody, ReqQuery> {}

type Events = "deposit" | "withdraw" | "transfer";

interface BalanceQuery {
  account_id: string;
}

interface EventBody {
  type: Events;
  destination: string;
  origin: string;
  amount: number;
}

export type BalanceRequest = ApplicationRequest<
  unknown,
  unknown,
  unknown,
  BalanceQuery
>;
export type EventRequest = ApplicationRequest<
  unknown,
  unknown,
  EventBody,
  unknown
>;

export type DepositParams = Pick<EventBody, "destination" | "amount">;

export type WithdrawParams = Pick<EventBody, "origin" | "amount">;

export type TransferParams = Pick<
  EventBody,
  "destination" | "origin" | "amount"
>;

export type ErrorResponse = number | string;
