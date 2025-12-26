import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "./SavingsDonutChart.module.css";

export function SavingsDonutChart({
  income,
  expenses,
  isAnimationActive = true,
}) {
  const spent = Math.abs(expenses);
  const saved = Math.max(income - spent, 0);
  const total = income;

  if (total === 0) {
    return (
      <div className={styles.empty}>
        <p>No income data yet</p>
      </div>
    );
  }

  const data = [
    {
      name: "Saved",
      value: saved,
      color: "#2fbf8f",
    },
    {
      name: "Spent",
      value: spent,
      color: "#f76d6d",
    },
  ];

  return (
    <div className={styles.chartRoot}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="65%"
            outerRadius="100%"
            stroke="transparent"
            paddingAngle={4}
            cornerRadius={6}
            animationDuration={800}
            animationBegin={200}
            isAnimationActive={isAnimationActive}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
            contentStyle={{
              borderRadius: 5,
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className={styles.center}>
        <span className={styles.value}>
          {((saved / total) * 100).toFixed(0)}%
        </span>
        <span className={styles.label}>Savings</span>
      </div>
    </div>
  );
}
