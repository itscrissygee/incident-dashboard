import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Clock, TrendingUp, AlertCircle, Target, Award } from "lucide-react";

// Mock data generation (we'll move this to a separate file later)
const generateMockData = () => {
  const shifts = ["Morning", "Afternoon", "Overnight"];

  const weeklyData = shifts.map((shift) => ({
    shift,
    incidents_processed: 300 + Math.floor(Math.random() * 40),
    title_accuracy: 85 + Math.random() * 5,
    body_relevance: 84 + Math.random() * 6,
    address_accuracy: 86 + Math.random() * 4,
    category_accuracy: 87 + Math.random() * 3,
    click_through_rate: 75 + Math.random() * 10,
    response_time: 2 + Math.random() * 3,
    critical_incidents: Math.floor(Math.random() * 10),
  }));

  const analystData = Array.from({ length: 14 }, (_, i) => ({
    name: `Analyst ${i + 1}`,
    overall_accuracy: 84 + Math.random() * 6,
    incidents_processed: 300 + Math.random() * 40,
    click_through_rate: 75 + Math.random() * 10,
  }));

  return { weeklyData, analystData };
};

const IncidentDashboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<"day" | "week" | "month">("day");
  const [selectedShift, setSelectedShift] = useState<string>("all");
  const { weeklyData, analystData } = generateMockData();

  const MetricCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
  }> = ({ title, value, icon, trend }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Incident Analysis Dashboard</h1>

        <div className="flex gap-4">
          <Select
            value={timeFrame}
            onValueChange={(value: any) => setTimeFrame(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="overnight">Overnight</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="CTR"
          value={`${Math.round(weeklyData[0].click_through_rate)}%`}
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend="+2.1% from yesterday"
        />

        <MetricCard
          title="Accuracy Score"
          value={`${Math.round(weeklyData[0].title_accuracy)}%`}
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          trend="+0.5% from last shift"
        />

        <MetricCard
          title="Response Time"
          value={`${weeklyData[0].response_time.toFixed(1)}m`}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          trend="-0.3m from average"
        />

        <MetricCard
          title="Critical Incidents"
          value={weeklyData[0].critical_incidents.toString()}
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
          trend="All resolved"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accuracy Metrics Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="shift" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="title_accuracy"
                  name="Title Accuracy"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="click_through_rate"
                  name="CTR"
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="address_accuracy"
                  name="Address"
                  stroke="#ffc658"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analyst Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analystData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" domain={[70, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 400]} />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="overall_accuracy"
                  name="Accuracy %"
                  fill="#8884d8"
                />
                <Bar
                  yAxisId="left"
                  dataKey="click_through_rate"
                  name="CTR %"
                  fill="#82ca9d"
                />
                <Bar
                  yAxisId="right"
                  dataKey="incidents_processed"
                  name="Incidents"
                  fill="#ffc658"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncidentDashboard;