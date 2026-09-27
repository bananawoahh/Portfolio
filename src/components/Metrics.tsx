import type { Metric } from '../types';

export function Metrics({ metrics }: { metrics: Metric[] }) {
  if (!metrics.length) return null;
  return (
    <dl className="metrics">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
          {metric.context && <dd className="metric-context">{metric.context}</dd>}
        </div>
      ))}
    </dl>
  );
}
