// src/stores/nodeStore.ts
import { create } from 'zustand';
import type { Node } from '@/types';

interface NodeState {
  nodes: Node[];
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  updateNode: (nodeId: string, updatedNode: Partial<Node>) => void;
}

const initialNodes: Node[] = [
  { id: 'start', label: 'Start Node', type: 'node' },
  // { id: 'p1', label: 'Process', type: 'process' },
  // { id: 'n2', label: 'Node 2', type: 'node' },
  // { id: 'p2', label: 'Process', type: 'process' },
  // { id: 'n3', label: 'Node 3', type: 'node' },
];

export const useNodeStore = create<NodeState>((set) => ({
  nodes: initialNodes,
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
    })),
  updateNode: (nodeId, updatedNode) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, ...updatedNode } : node,
      ),
    })),
}));
