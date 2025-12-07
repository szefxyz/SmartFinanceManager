import { LatestTransactions } from "../../components/LatestTransactions/LatestTransactions";
import { ExpenseCategories } from "../../components/ExpenseCategories/ExpenseCategories";

export function Home() {
  return (
    <>
      <LatestTransactions />
      <ExpenseCategories />
    </>
  );
}
