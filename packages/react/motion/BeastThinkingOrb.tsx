"use client";

import { ThinkingOrb, type ThinkingOrbProps } from "thinking-orbs";

export const BEAST_ORB_STATES = [
  "working", "searching", "solving", "listening", "connecting",
  "weaving", "composing", "breathing", "shaping",
] as const;

export type BeastThinkingOrbProps = Omit<ThinkingOrbProps, "aria-label"> & {
  /** Localized description of the actual activity, even when motion is reduced. */
  label: string;
};

/** Beast's shared micro-animation for AI activity. Keep visible status text alongside it. */
export function BeastThinkingOrb({
  label,
  size = 20,
  theme = "auto",
  state = "working",
  ...props
}: BeastThinkingOrbProps) {
  return <ThinkingOrb {...props} state={state} size={size} theme={theme} aria-label={label} />;
}
