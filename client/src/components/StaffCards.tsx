import type { StaffCard } from "../types/teams/Staff";
import "./StaffCards.scss";

interface StaffCardsProps {
  card: StaffCard;
}

export function StaffCards({ card }: StaffCardsProps) {}
