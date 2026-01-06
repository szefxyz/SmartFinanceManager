import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { categories } from "../../config/categories";
import styles from "./CategoriesDonutChart.module.css";

export function CategoriesDonutChart({ totals }) {
  const data = Object.entries(totals)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: categories[name]?.hex,
    }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (total === 0) {
    return (
      <div className={styles.empty}>
        <p>No category spending yet</p>
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
            stroke="transparent"
            paddingAngle={4}
            cornerRadius={6}
            animationDuration={800}
            animationBegin={200}
            isAnimationActive={true}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
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
        <span className={styles.value}>${total.toFixed(2)}</span>
        <span className={styles.label}>Savings</span>
      </div>
    </div>
  );
}
