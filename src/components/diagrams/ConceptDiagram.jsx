import * as D from "./Diagrams";

const DIAGRAM_MAP = {
  speedometer: D.SpeedometerDiagram,
  "load-ramp": D.LoadRampDiagram,
  "stress-break": D.StressBreakDiagram,
  "test-types-cards": D.TestTypesCardsDiagram,
  "time-compare": D.TimeCompareDiagram,
  "flow-pipe": D.FlowPipeDiagram,
  "process-steps": D.ProcessStepsDiagram,
  "latency-arrows": D.LatencyArrowsDiagram,
  "soak-line": D.SoakLineDiagram,
  "business-bars": D.BusinessBarsDiagram,
  "jmeter-tree": D.JMeterTreeDiagram,
  "k6-terminal": D.K6TerminalDiagram,
  "gatling-surge": D.GatlingSurgeDiagram,
  "tool-radar": D.ToolRadarDiagram,
  "users-spawn": D.UsersSpawnDiagram,
  "hierarchy-build": D.HierarchyBuildDiagram,
  "pipeline-flow": D.PipelineFlowDiagram,
  "distributed-nodes": D.DistributedNodesDiagram,
  "locust-dash": D.LocustDashDiagram,
  "decision-flow": D.DecisionFlowDiagram,
  "percentile-bell": D.PercentileBellDiagram,
  "error-traffic": D.ErrorTrafficDiagram,
  "waterfall-bars": D.WaterfallBarsDiagram,
  "metrics-dash": D.MetricsDashDiagram,
  "bottleneck-cpu": D.BottleneckCPUDiagram,
  "sla-circles": D.SLACirclesDiagram,
  "apdex-gauge": D.ApdexGaugeDiagram,
  "cycle-steps": D.CycleStepsDiagram,
  "apm-stack": D.APMStackDiagram,
  "variance-dist": D.VarianceDistDiagram,
};

export default function ConceptDiagram({ id }) {
  const Comp = DIAGRAM_MAP[id];
  if (!Comp) {
    return (
      <div className="text-muted-foreground text-xs text-center">
        No diagram
      </div>
    );
  }
  return <Comp />;
}
