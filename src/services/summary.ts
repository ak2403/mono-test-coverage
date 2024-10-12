export const getSummary = (coverages: Record<string, any>) => {
  const stats = Object.values(coverages);

  const total = stats.map((stat) => stat.total);

  return total[0].lines.total;
};
