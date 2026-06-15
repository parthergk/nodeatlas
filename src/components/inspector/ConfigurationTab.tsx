import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceNode } from "@/types/graph";
import { useBuilderStore } from "@/store/useBuilderStore";

interface ConfigurationTabProps {
  node: ServiceNode;
}

export default function ConfigurationTab({node}: ConfigurationTabProps) {

  const graphNodes = useBuilderStore((state) => state.graphNodes);
  const setGraphNodes = useBuilderStore((state) => state.setGraphNodes);

  const updateNodeData = (
    field: string,
    value: string | number
  ) => {
    const updatedNodes = graphNodes.map((n) => {
      if (n.id === node.id) {
        return {
          ...n,
          data: {
            ...n.data,
            [field]: value,
          },
        };
      }

      return n;
    });

    setGraphNodes(updatedNodes);
  };

  return (
    <div className="space-y-4">
      {/* Node Name */}
      <div>
        <label className="mb-2 block text-sm">
          Node Name
        </label>

        <Input
          value={node.data.label}
          onChange={(e) =>
            updateNodeData(
              "label",
              e.target.value
            )
          }
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm">
          Description
        </label>

        <Textarea
          value={node.data.description ?? ""}
          onChange={(e) =>
            updateNodeData(
              "description",
              e.target.value
            )
          }
        />
      </div>

      {/* Capacity */}
      <div className="space-y-3">
        <label className="block text-sm">
          Capacity
        </label>

        <Slider
          value={[node.data.capacity]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => {
            const val = Array.isArray(value) ? value[0] : value;
            updateNodeData(
              "capacity",
              val
            );
          }}
        />

        <Input
          type="number"
          min={0}
          max={100}
          value={node.data.capacity}
          onChange={(e) =>
            updateNodeData(
              "capacity",
              Number(e.target.value)
            )
          }
        />
      </div>
    </div>
  );
}