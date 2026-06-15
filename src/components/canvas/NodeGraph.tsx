import React, { useEffect } from "react";
import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useBuilderStore } from "../../store/useBuilderStore";
import { ServiceNode } from "./nodes/ServiceNode";
import { useGraph } from "../../hooks/useGraph";
import { NodeGraphSkeleton } from "./nodes/NodeGraphSkeleton";
import { NodeGraphError } from "./nodes/NodeGraphError";

const nodeTypes = {
  serviceNode: ServiceNode,
};


export function NodeGraph() {
  const setSelectedNodeId = useBuilderStore((state) => state.setSelectedNodeId);
  const activeTool = useBuilderStore((state) => state.activeTool);
  const selectedAppId = useBuilderStore((state) => state.selectedAppId);
  const { data, isLoading, error } = useGraph(selectedAppId);


  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (data) {
      setNodes(data.nodes || []);
      setEdges(data.connections || []);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [data, setNodes, setEdges]);

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  };

  if (isLoading) {
    return <NodeGraphSkeleton />;
  }

  if (error) {
    return (
      <NodeGraphError message={error instanceof Error ? error.message : String(error)} />
    );
  }

  return (
    <div className={`h-full w-full ${activeTool === "hand"
        ? "cursor-grab"
        : "cursor-default"
      }`}>
      <ReactFlow
        className={
          activeTool === "hand"
            ? "hand-mode"
            : "pointer-mode"
        }
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={
          activeTool === "pointer"
        }
        elementsSelectable={
          activeTool === "pointer"
        }
        panOnDrag={
          activeTool === "hand"
        }
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
      />
    </div>
  );
}
