import { classNames } from "../../utils/format";

type BadgeTone = "blue" | "green" | "amber" | "red" | "slate";

const tones: Record<BadgeTone, string> = {
  blue: "bg-blue-50 text-primary ring-blue-100",
  green: "bg-green-50 text-green-700 ring-green-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  red: "bg-red-50 text-red-700 ring-red-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function Badge({ children, tone = "slate" }: { children: string; tone?: BadgeTone }) {
  return (
    <span className={classNames("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tones[tone])}>
      {children}
    </span>
  );
}
