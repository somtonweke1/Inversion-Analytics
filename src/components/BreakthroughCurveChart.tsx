'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts'
import { BreakthroughPoint, ValidationMetrics } from '@/lib/breakthrough-model'

interface BreakthroughCurveChartProps {
  predicted: BreakthroughPoint[]
  observed?: BreakthroughPoint[]
  title?: string
  description?: string
  compoundName?: string
  influentConcentration?: number
  validationMetrics?: ValidationMetrics
}

export default function BreakthroughCurveChart({
  predicted,
  observed,
  title = 'GAC Breakthrough Curve',
  description = 'Predicted PFAS concentration over time',
  compoundName = 'Total PFAS',
  influentConcentration,
  validationMetrics
}: BreakthroughCurveChartProps) {

  // Merge predicted and observed data if both are provided
  const chartData = predicted.map((p, i) => ({
    time: p.time,
    bedVolumes: p.bedVolumes,
    predicted: p.concentration,
    percentBreakthrough: p.percentBreakthrough,
    observed: observed && observed[i] ? observed[i].concentration : undefined
  }))

  // Find key breakthrough points
  const breakthrough10 = predicted.find(p => p.percentBreakthrough >= 10)
  const breakthrough50 = predicted.find(p => p.percentBreakthrough >= 50)
  const breakthrough95 = predicted.find(p => p.percentBreakthrough >= 95)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
          {compoundName && ` - ${compoundName}`}
        </CardDescription>

        {/* Key Metrics Display */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {breakthrough10 && (
            <div className="text-sm">
              <p className="text-slate-600 font-medium">10% Breakthrough</p>
              <p className="text-lg font-bold text-blue-600">{breakthrough10.time.toFixed(0)} days</p>
              <p className="text-xs text-slate-500">{breakthrough10.bedVolumes.toFixed(0)} BV</p>
            </div>
          )}
          {breakthrough50 && (
            <div className="text-sm">
              <p className="text-slate-600 font-medium">50% Breakthrough</p>
              <p className="text-lg font-bold text-amber-600">{breakthrough50.time.toFixed(0)} days</p>
              <p className="text-xs text-slate-500">{breakthrough50.bedVolumes.toFixed(0)} BV</p>
            </div>
          )}
          {breakthrough95 && (
            <div className="text-sm">
              <p className="text-slate-600 font-medium">95% Exhaustion</p>
              <p className="text-lg font-bold text-red-600">{breakthrough95.time.toFixed(0)} days</p>
              <p className="text-xs text-slate-500">{breakthrough95.bedVolumes.toFixed(0)} BV</p>
            </div>
          )}
        </div>

        {/* Validation Metrics */}
        {validationMetrics && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Model Validation Metrics</h4>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-slate-600">R² (Goodness of Fit)</p>
                <p className="font-bold text-lg">{validationMetrics.r2.toFixed(3)}</p>
              </div>
              <div>
                <p className="text-slate-600">RMSE</p>
                <p className="font-bold text-lg">{validationMetrics.rmse.toFixed(2)} ng/L</p>
              </div>
              <div>
                <p className="text-slate-600">MAE</p>
                <p className="font-bold text-lg">{validationMetrics.mae.toFixed(2)} ng/L</p>
              </div>
              <div>
                <p className="text-slate-600">MAPE</p>
                <p className="font-bold text-lg">{validationMetrics.mape.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-slate-600">Max Error</p>
                <p className="font-bold text-lg">{validationMetrics.maxError.toFixed(2)} ng/L</p>
              </div>
              <div>
                <p className="text-slate-600">Avg % Diff</p>
                <p className="font-bold text-lg">{validationMetrics.avgPercentDiff.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {/* Concentration vs Time Chart */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold mb-2">Effluent Concentration vs Time</h4>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{ value: 'Time (days)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Concentration (ng/L)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 border border-slate-200 rounded shadow-lg">
                        <p className="font-semibold">Day {data.time.toFixed(0)}</p>
                        <p className="text-sm text-blue-600">
                          Predicted: {data.predicted.toFixed(2)} ng/L
                        </p>
                        {data.observed !== undefined && (
                          <p className="text-sm text-green-600">
                            Observed: {data.observed.toFixed(2)} ng/L
                          </p>
                        )}
                        <p className="text-sm text-slate-600">
                          {data.percentBreakthrough.toFixed(1)}% breakthrough
                        </p>
                        <p className="text-sm text-slate-600">
                          {data.bedVolumes.toFixed(0)} bed volumes
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />

              {/* Predicted line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Predicted"
              />

              {/* Observed line (if provided) */}
              {observed && (
                <Line
                  type="monotone"
                  dataKey="observed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Observed"
                />
              )}

              {/* Reference lines for breakthrough thresholds */}
              {influentConcentration && (
                <>
                  <ReferenceLine
                    y={influentConcentration * 0.1}
                    stroke="#3b82f6"
                    strokeDasharray="3 3"
                    label={{ value: '10% BT', position: 'right', fill: '#3b82f6', fontSize: 12 }}
                  />
                  <ReferenceLine
                    y={influentConcentration * 0.5}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{ value: '50% BT', position: 'right', fill: '#f59e0b', fontSize: 12 }}
                  />
                  <ReferenceLine
                    y={influentConcentration * 0.95}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    label={{ value: '95% BT', position: 'right', fill: '#ef4444', fontSize: 12 }}
                  />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Breakthrough Percentage vs Bed Volumes Chart */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Breakthrough Percentage vs Bed Volumes</h4>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="bedVolumes"
                label={{ value: 'Bed Volumes (BV)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Breakthrough (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-3 border border-slate-200 rounded shadow-lg">
                        <p className="font-semibold">{data.bedVolumes.toFixed(0)} BV</p>
                        <p className="text-sm text-purple-600">
                          {data.percentBreakthrough.toFixed(1)}% breakthrough
                        </p>
                        <p className="text-sm text-slate-600">
                          Day {data.time.toFixed(0)}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend />

              {/* Area chart for visual appeal */}
              <defs>
                <linearGradient id="colorBreakthrough" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="percentBreakthrough"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#colorBreakthrough)"
                name="Breakthrough %"
              />

              {/* Reference lines */}
              <ReferenceLine y={10} stroke="#3b82f6" strokeDasharray="3 3" />
              <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="3 3" />
              <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="3 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
