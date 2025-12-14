import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import styles from "./CategoryDonutChart.module.css";

export function CategoryDonutChart({
  categoriesData,
  isAnimationActive = true,
}) {
  const data = categoriesData.map((c) => ({
    name: c.category,
    value: Math.abs(c.balance),
    color: c.color,
  }));

  const total = data.reduce((sum, t) => sum + t.value, 0);

  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No expenses yet</p>
      </div>
    );
  }

  return (
    <div className={styles.chartRoot}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius="65%"
            outerRadius="100%"
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
            formatter={(value, name) => [`-$${value.toFixed(2)}`, name]}
            contentStyle={{
              borderRadius: 5,
              border: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className={styles.center}>
        <span className={styles.label}>Total spent</span>
        <span className={styles.value}>
          {total > 0 ? "-" : ""}${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
