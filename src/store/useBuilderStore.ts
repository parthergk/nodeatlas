import { create } from "zustand";

interface BuilderState {
    selectedAppId: string;
    selectedNodeId: string | null;
    isMobilePanelOpen: boolean;
    activeInspectorTab: string;

    setSelectedAppId: (id: string) => void;
    setSelectedNodeId: (id: string | null) => void;
    setIsMobilePanelOpen: (open: boolean) => void;
    setActiveInspectorTab: (tab: string) => void;
}

export const useBuilderStore = create<BuilderState>((set) => ({
    selectedAppId: "payments",
    selectedNodeId: null,
    isMobilePanelOpen: false,
    activeInspectorTab: "properties",

    setSelectedAppId: (id: string) => set({ selectedAppId: id }),
    setSelectedNodeId: (id: string | null) => set({ selectedNodeId: id }),
    setIsMobilePanelOpen: (open: boolean) => set({ isMobilePanelOpen: open }),
    setActiveInspectorTab: (tab: string) => set({ activeInspectorTab: tab }),
}));