import { useCallback, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HStack, Stack } from "@/components/ui/stack";
import { Heading, Text, Label } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import LayerInspector from "@/components/vfx/LayerInspector";
import VfxMiniPreview from "@/components/vfx/VfxMiniPreview";
import VfxPreviewCanvas from "@/components/vfx/VfxPreviewCanvas";
import fireballImpact from "@/data/vfx-presets/fireball-impact.json";
import fireballMuzzle from "@/data/vfx-presets/fireball-muzzle.json";
import fireballTravel from "@/data/vfx-presets/fireball-travel.json";
import fireballTravelLeft from "@/data/vfx-presets/fireball-travel_left.json";
import frostboltImpact from "@/data/vfx-presets/frostbolt-impact.json";
import frostboltTravel from "@/data/vfx-presets/frostbolt-travel.json";
import type { Keyframe, VfxEffect, VfxLayer, VfxLayerType } from "@/types/vfx";

const PRESETS: { id: string; label: string; data: VfxEffect }[] = [
	{
		id: "fireball-muzzle",
		label: "Fireball Muzzle",
		data: fireballMuzzle as VfxEffect,
	},
	{
		id: "fireball-travel",
		label: "Fireball Travel",
		data: fireballTravel as VfxEffect,
	},
	{
		id: "fireball-travel_left",
		label: "Fireball Travel L",
		data: fireballTravelLeft as VfxEffect,
	},
	{
		id: "fireball-impact",
		label: "Fireball Impact",
		data: fireballImpact as VfxEffect,
	},
	{
		id: "frostbolt-travel",
		label: "Frostbolt Travel",
		data: frostboltTravel as VfxEffect,
	},
	{
		id: "frostbolt-impact",
		label: "Frostbolt Impact",
		data: frostboltImpact as VfxEffect,
	},
];

const LAYER_TYPES: { value: VfxLayerType; label: string; icon: string }[] = [
	{ value: "orb", label: "Orb", icon: "🔮" },
	{ value: "ring", label: "Ring", icon: "⭕" },
	{ value: "trail", label: "Trail", icon: "✨" },
	{ value: "streak", label: "Streak", icon: "⚡" },
	{ value: "diamond", label: "Diamond", icon: "💎" },
	{ value: "arc", label: "Arc", icon: "🌙" },
	{ value: "starburst", label: "Starburst", icon: "💥" },
	{ value: "sprite", label: "Sprite", icon: "🖼️" },
];

const createDefaultLayer = (type: VfxLayerType, index: number): VfxLayer => {
	const id = `${type}-${index + 1}`;
	const baseTracks = {
		scale: [{ at: 0, value: 1 }] as Keyframe[],
		alpha: [{ at: 0, value: 1 }] as Keyframe[],
	};

	switch (type) {
		case "orb":
			return {
				id,
				type,
				radius: 10,
				color: "#fff1c9",
				glowColor: "rgba(255,214,133,0.6)",
				glowScale: 2,
				tracks: baseTracks,
			};
		case "ring":
			return {
				id,
				type,
				radius: 16,
				thickness: 4,
				color: "#ffd27a",
				tracks: baseTracks,
			};
		case "trail":
			return {
				id,
				type,
				radius: 12,
				segments: 6,
				spacing: 0.06,
				falloff: 0.1,
				style: "fill",
				color: "rgba(255,140,60,0.66)",
				tracks: baseTracks,
			};
		case "streak":
			return {
				id,
				type,
				width: 48,
				height: 12,
				rotationDeg: -24,
				color: "#ffd27a",
				tracks: baseTracks,
			};
		case "diamond":
			return {
				id,
				type,
				width: 24,
				height: 36,
				rotationDeg: 0,
				color: "#9ee7ff",
				tracks: baseTracks,
			};
		case "arc":
			return {
				id,
				type,
				radius: 22,
				thickness: 5,
				sweepDeg: 130,
				rotationDeg: -90,
				color: "#ffcf88",
				tracks: baseTracks,
			};
		case "starburst":
			return {
				id,
				type,
				innerRadius: 8,
				outerRadius: 20,
				points: 6,
				rotationDeg: -90,
				color: "#fff1c9",
				tracks: baseTracks,
			};
		case "sprite":
			return {
				id,
				type,
				spriteId: "default",
				width: 42,
				height: 42,
				tintColor: "",
				tracks: baseTracks,
			};
	}
};

const createBlankEffect = (): VfxEffect => ({
	id: "new-effect",
	label: "New Effect",
	durationMs: 320,
	motion: { mode: "fixed" },
	layers: [],
});

const VfxEditorPage = () => {
	const [effect, setEffect] = useState<VfxEffect>(createBlankEffect);
	const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(
		null,
	);
	const [hiddenLayers, setHiddenLayers] = useState<Set<string>>(new Set());
	const [showJson, setShowJson] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const selectedLayer =
		selectedLayerIndex !== null
			? (effect.layers[selectedLayerIndex] ?? null)
			: null;

	const updateEffect = useCallback((patch: Partial<VfxEffect>) => {
		setEffect((prev) => ({ ...prev, ...patch }));
	}, []);

	const addLayer = useCallback((type: VfxLayerType) => {
		setEffect((prev) => {
			const layer = createDefaultLayer(type, prev.layers.length);
			const layers = [...prev.layers, layer];
			setSelectedLayerIndex(layers.length - 1);
			return { ...prev, layers };
		});
	}, []);

	const removeLayer = useCallback((index: number) => {
		setEffect((prev) => {
			const layers = prev.layers.filter((_, i) => i !== index);
			return { ...prev, layers };
		});
		setSelectedLayerIndex(null);
	}, []);

	const moveLayer = useCallback((index: number, direction: -1 | 1) => {
		setEffect((prev) => {
			const target = index + direction;
			if (target < 0 || target >= prev.layers.length) return prev;
			const layers = [...prev.layers];
			[layers[index], layers[target]] = [layers[target], layers[index]];
			setSelectedLayerIndex(target);
			return { ...prev, layers };
		});
	}, []);

	const toggleLayerVisibility = useCallback((layerId: string) => {
		setHiddenLayers((prev) => {
			const next = new Set(prev);
			if (next.has(layerId)) next.delete(layerId);
			else next.add(layerId);
			return next;
		});
	}, []);

	const duplicateLayer = useCallback((index: number) => {
		setEffect((prev) => {
			const source = prev.layers[index];
			const clone = JSON.parse(JSON.stringify(source)) as VfxLayer;
			clone.id = `${source.id}-copy`;
			const layers = [...prev.layers];
			layers.splice(index + 1, 0, clone);
			setSelectedLayerIndex(index + 1);
			return { ...prev, layers };
		});
	}, []);

	const updateLayer = useCallback((index: number, patch: Partial<VfxLayer>) => {
		setEffect((prev) => {
			const layers = prev.layers.map((l, i) =>
				i === index ? ({ ...l, ...patch } as VfxLayer) : l,
			);
			return { ...prev, layers };
		});
	}, []);

	const handleExport = useCallback(() => {
		const blob = new Blob([JSON.stringify(effect, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${effect.id}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}, [effect]);

	const handleImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const parsed = JSON.parse(reader.result as string) as VfxEffect;
				setEffect(parsed);
				setSelectedLayerIndex(null);
			} catch {
				// invalid JSON
			}
		};
		reader.readAsText(file);
		e.target.value = "";
	}, []);

	return (
		<Stack className="gap-6">
			<HStack className="justify-between">
				<Box>
					<Heading>VFX Editor</Heading>
					<Text muted>Create and edit visual effects</Text>
				</Box>
				<HStack>
					<Button
						variant="outline"
						size="sm"
						onClick={() => fileInputRef.current?.click()}
					>
						Import JSON
					</Button>
					<Button variant="outline" size="sm" onClick={handleExport}>
						Export JSON
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setShowJson((v) => !v)}
					>
						{showJson ? "Hide JSON" : "Show JSON"}
					</Button>
					<input
						ref={fileInputRef}
						type="file"
						accept=".json"
						className="hidden"
						onChange={handleImport}
					/>
				</HStack>
			</HStack>

			{/* Effect selector with live previews */}
			<Card>
				<CardHeader className="pb-2">
					<HStack className="justify-between">
						<CardTitle className="text-base">Effects Library</CardTitle>
						<Button
							size="xs"
							variant="outline"
							onClick={() => {
								setEffect(createBlankEffect());
								setSelectedLayerIndex(null);
								setHiddenLayers(new Set());
							}}
						>
							+ New blank
						</Button>
					</HStack>
				</CardHeader>
				<CardContent>
					<Box className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
						{PRESETS.map((preset) => (
							<VfxMiniPreview
								key={preset.id}
								effect={preset.data}
								selected={effect.id === preset.id}
								onClick={() => {
									setEffect(structuredClone(preset.data));
									setSelectedLayerIndex(null);
									setHiddenLayers(new Set());
								}}
							/>
						))}
					</Box>
				</CardContent>
			</Card>

			<Box className="grid gap-4 lg:grid-cols-[1fr_380px]">
				{/* Left: Preview + Effect settings + Layers */}
				<Stack className="gap-4">
					{/* Preview */}
					<Card>
						<CardContent className="p-0">
							<VfxPreviewCanvas
								effect={effect}
								selectedLayerIndex={selectedLayerIndex}
								hiddenLayers={hiddenLayers}
							/>
						</CardContent>
					</Card>

					{/* Effect settings */}
					<Card>
						<CardHeader className="pb-3">
							<CardTitle className="text-base">Effect Settings</CardTitle>
						</CardHeader>
						<CardContent>
							<Box className="grid gap-3 sm:grid-cols-3">
								<Stack className="gap-1">
									<Label>ID</Label>
									<Input
										value={effect.id}
										onChange={(e) => updateEffect({ id: e.target.value })}
									/>
								</Stack>
								<Stack className="gap-1">
									<Label>Label</Label>
									<Input
										value={effect.label}
										onChange={(e) => updateEffect({ label: e.target.value })}
									/>
								</Stack>
								<Stack className="gap-1">
									<Label>Duration (ms)</Label>
									<Input
										type="number"
										value={effect.durationMs}
										onChange={(e) =>
											updateEffect({ durationMs: Number(e.target.value) })
										}
									/>
								</Stack>
							</Box>
							<Box className="mt-3">
								<Label>Motion</Label>
								<HStack className="mt-1">
									{(["fixed", "line", "arc"] as const).map((mode) => (
										<Button
											key={mode}
											size="xs"
											variant={
												effect.motion.mode === mode ? "default" : "outline"
											}
											onClick={() =>
												updateEffect({ motion: { ...effect.motion, mode } })
											}
										>
											{mode}
										</Button>
									))}
								</HStack>
							</Box>
						</CardContent>
					</Card>

					{/* Layers list */}
					<Card>
						<CardHeader className="pb-3">
							<HStack className="justify-between">
								<CardTitle className="text-base">
									Layers ({effect.layers.length})
								</CardTitle>
								<HStack className="gap-1 flex-wrap">
									{LAYER_TYPES.map((lt) => (
										<Button
											key={lt.value}
											size="xs"
											variant="ghost"
											onClick={() => addLayer(lt.value)}
										>
											{lt.icon}
										</Button>
									))}
								</HStack>
							</HStack>
						</CardHeader>
						<CardContent>
							{effect.layers.length === 0 ? (
								<Text muted size="sm" className="text-center py-4">
									No layers yet. Click an icon above to add one.
								</Text>
							) : (
								<Stack className="gap-1">
									{effect.layers.map((layer, index) => {
										const isSelected = selectedLayerIndex === index;
										const typeInfo = LAYER_TYPES.find(
											(lt) => lt.value === layer.type,
										);

										const isHidden = hiddenLayers.has(layer.id);

										return (
											<HStack
												key={layer.id}
												className={`rounded-md px-3 py-2 cursor-pointer transition-colors ${
													isSelected
														? "bg-sidebar-accent text-sidebar-accent-foreground"
														: "hover:bg-muted/50"
												} ${isHidden ? "opacity-40" : ""}`}
												onClick={() => setSelectedLayerIndex(index)}
											>
												<Button
													size="icon-xs"
													variant="ghost"
													className="shrink-0"
													onClick={(e) => {
														e.stopPropagation();
														toggleLayerVisibility(layer.id);
													}}
												>
													{isHidden ? "👁️‍🗨️" : "👁️"}
												</Button>
												<Text as="span">{typeInfo?.icon ?? "?"}</Text>
												<Text size="sm" className="flex-1 font-mono truncate">
													{layer.id}
												</Text>
												<Badge
													variant="outline"
													className="text-[10px] shrink-0"
												>
													{layer.type}
												</Badge>
												<HStack className="gap-0.5 shrink-0">
													<Button
														size="icon-xs"
														variant="ghost"
														onClick={(e) => {
															e.stopPropagation();
															moveLayer(index, -1);
														}}
														disabled={index === 0}
													>
														↑
													</Button>
													<Button
														size="icon-xs"
														variant="ghost"
														onClick={(e) => {
															e.stopPropagation();
															moveLayer(index, 1);
														}}
														disabled={index === effect.layers.length - 1}
													>
														↓
													</Button>
													<Button
														size="icon-xs"
														variant="ghost"
														onClick={(e) => {
															e.stopPropagation();
															duplicateLayer(index);
														}}
													>
														⎘
													</Button>
													<Button
														size="icon-xs"
														variant="ghost"
														className="text-destructive"
														onClick={(e) => {
															e.stopPropagation();
															removeLayer(index);
														}}
													>
														×
													</Button>
												</HStack>
											</HStack>
										);
									})}
								</Stack>
							)}
						</CardContent>
					</Card>
				</Stack>

				{/* Right: Inspector + JSON */}
				<Stack className="gap-4">
					{selectedLayer && selectedLayerIndex !== null ? (
						<LayerInspector
							layer={selectedLayer}
							onChange={(patch) => updateLayer(selectedLayerIndex, patch)}
						/>
					) : (
						<Card>
							<CardContent className="py-8">
								<Text muted size="sm" className="text-center">
									Select a layer to edit its properties
								</Text>
							</CardContent>
						</Card>
					)}

					{showJson ? (
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">JSON</CardTitle>
							</CardHeader>
							<CardContent>
								<Textarea
									className="font-mono text-xs min-h-75"
									value={JSON.stringify(effect, null, 2)}
									readOnly
								/>
							</CardContent>
						</Card>
					) : null}
				</Stack>
			</Box>
		</Stack>
	);
};

export default VfxEditorPage;
