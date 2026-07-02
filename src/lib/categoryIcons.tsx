import { Layers, Smartphone, Gauge, Repeat, Clock3, type LucideIcon } from "lucide-react";
import type { CategoryId } from "../data/questions";

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  multitasking: Layers,
  digital: Smartphone,
  akademik: Gauge,
  kebiasaan: Repeat,
  waktu: Clock3,
};
