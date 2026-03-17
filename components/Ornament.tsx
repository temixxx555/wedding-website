import { HeartIcon } from "./icons";

interface Props {
  light?: boolean;
}

export default function Ornament({ light }: Props) {
  const color = light ? "var(--color-blush)" : "var(--color-gold)";
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <span className="block h-px w-10" style={{ backgroundColor: color }} />
      <HeartIcon className="w-3 h-3" style={{ fill: color }} />
      <span className="block h-px w-10" style={{ backgroundColor: color }} />
    </div>
  );
}
