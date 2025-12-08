import { useMatches } from "react-router-dom";
import TimeSwitcher from "../../components/TimeSwitcher/TimeSwitcher";

export function Payments() {
  const matches = useMatches();
  const current = matches.find((m) => m.handle?.title);
  const showFilters = current?.handle?.showTimeFilters || false;
  return <>{showFilters && <TimeSwitcher />}</>;
}
