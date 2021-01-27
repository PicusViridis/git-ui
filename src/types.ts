import { Request as Req, Response as Res } from 'express'

export type Request<A = unknown, B = unknown, C = unknown, D = unknown, E = Record<string, unknown>> = Req<
  A,
  B,
  C,
  D,
  E
>

export type Response<A = unknown, B = Record<string, unknown>> = Res<A, B>
