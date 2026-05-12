import type { Dispatch } from "react";

export type Pages = readonly {
  readonly text: string;
  readonly handler: Dispatch<void>;
  disabled?: boolean;
}[];
