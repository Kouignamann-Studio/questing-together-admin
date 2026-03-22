import { type MouseEvent, useCallback, useRef, useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import type { Keyframe } from "@/types/vfx";

const W = 280;
const H = 100;
const PAD_X = 24;
const PAD_Y = 12;
const PLOT_W = W - PAD_X * 2;
const PLOT_H = H - PAD_Y * 2;
const DOT_R = 5;

const toSvgX = (at: number) => PAD_X + at * PLOT_W;
const toSvgY = (value: number) =>
	PAD_Y + (1 - Math.min(1, Math.max(0, value))) * PLOT_H;
const fromSvgX = (sx: number) =>
	Math.max(0, Math.min(1, (sx - PAD_X) / PLOT_W));
const fromSvgY = (sy: number) =>
	Math.max(0, Math.min(2, 1 - (sy - PAD_Y) / PLOT_H));

type CurveEditorProps = {
	trackName: string;
	keyframes: Keyframe[];
	onChange: (keyframes: Keyframe[]) => void;
	color?: string;
};

const CurveEditor = ({
	trackName,
	keyframes,
	onChange,
	color = "#ffd27a",
}: CurveEditorProps) => {
	const svgRef = useRef<SVGSVGElement>(null);
	const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
	const [hoverInfo, setHoverInfo] = useState<{
		at: number;
		value: number;
	} | null>(null);

	const getSvgPoint = useCallback((e: React.MouseEvent | MouseEvent) => {
		const svg = svgRef.current;
		if (!svg) return { x: 0, y: 0 };
		const rect = svg.getBoundingClientRect();
		const scaleX = W / rect.width;
		const scaleY = H / rect.height;
		return {
			x: (e.clientX - rect.left) * scaleX,
			y: (e.clientY - rect.top) * scaleY,
		};
	}, []);

	const handlePointerDown = useCallback(
		(index: number, e: React.PointerEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setDraggingIndex(index);
			(e.target as SVGElement).setPointerCapture(e.pointerId);
		},
		[],
	);

	const handlePointerMove = useCallback(
		(e: React.PointerEvent) => {
			if (draggingIndex === null) return;
			const pt = getSvgPoint(e);
			const at = Number(fromSvgX(pt.x).toFixed(3));
			const value = Number(fromSvgY(pt.y).toFixed(3));
			const updated = keyframes.map((kf, i) =>
				i === draggingIndex ? { at, value } : kf,
			);
			updated.sort((a, b) => a.at - b.at);
			onChange(updated);
			setHoverInfo({ at, value });
		},
		[draggingIndex, keyframes, onChange, getSvgPoint],
	);

	const handlePointerUp = useCallback(() => {
		setDraggingIndex(null);
		setHoverInfo(null);
	}, []);

	const handleDoubleClick = useCallback(
		(e: MouseEvent) => {
			const pt = getSvgPoint(e);
			const at = Number(fromSvgX(pt.x).toFixed(3));
			const value = Number(fromSvgY(pt.y).toFixed(3));
			const updated = [...keyframes, { at, value }].sort((a, b) => a.at - b.at);
			onChange(updated);
		},
		[keyframes, onChange, getSvgPoint],
	);

	const handleRemove = useCallback(
		(index: number, e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			if (keyframes.length <= 1) return;
			onChange(keyframes.filter((_, i) => i !== index));
		},
		[keyframes, onChange],
	);

	const pathD =
		keyframes.length > 0
			? `M ${keyframes.map((kf) => `${toSvgX(kf.at)} ${toSvgY(kf.value)}`).join(" L ")}`
			: "";

	return (
		<Box className="rounded-md border border-border bg-background/50 overflow-hidden">
			<HStack className="px-2 py-1 justify-between bg-muted/30">
				<Text size="xs" className="font-medium capitalize">
					{trackName}
				</Text>
				{hoverInfo ? (
					<Text size="xs" mono muted>
						{hoverInfo.at.toFixed(2)} → {hoverInfo.value.toFixed(2)}
					</Text>
				) : (
					<Text size="xs" muted>
						{keyframes.length} keys
					</Text>
				)}
			</HStack>
			<svg
				ref={svgRef}
				viewBox={`0 0 ${W} ${H}`}
				className="w-full cursor-crosshair select-none"
				style={{ height: 100 }}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onDoubleClick={handleDoubleClick}
			>
				<title>{trackName} curve</title>
				{/* Background grid */}
				<rect
					x={PAD_X}
					y={PAD_Y}
					width={PLOT_W}
					height={PLOT_H}
					fill="rgba(255,255,255,0.02)"
					rx={2}
				/>
				{[0, 0.25, 0.5, 0.75, 1].map((v) => (
					<line
						key={`h-${v}`}
						x1={PAD_X}
						y1={toSvgY(v)}
						x2={PAD_X + PLOT_W}
						y2={toSvgY(v)}
						stroke="rgba(255,255,255,0.06)"
					/>
				))}
				{[0, 0.25, 0.5, 0.75, 1].map((v) => (
					<line
						key={`v-${v}`}
						x1={toSvgX(v)}
						y1={PAD_Y}
						x2={toSvgX(v)}
						y2={PAD_Y + PLOT_H}
						stroke="rgba(255,255,255,0.06)"
					/>
				))}

				{/* Axis labels */}
				<text
					x={PAD_X - 2}
					y={PAD_Y + 3}
					fontSize={7}
					fill="rgba(255,255,255,0.25)"
					textAnchor="end"
				>
					1
				</text>
				<text
					x={PAD_X - 2}
					y={PAD_Y + PLOT_H + 3}
					fontSize={7}
					fill="rgba(255,255,255,0.25)"
					textAnchor="end"
				>
					0
				</text>
				<text
					x={PAD_X}
					y={PAD_Y + PLOT_H + 10}
					fontSize={7}
					fill="rgba(255,255,255,0.25)"
					textAnchor="middle"
				>
					0
				</text>
				<text
					x={PAD_X + PLOT_W}
					y={PAD_Y + PLOT_H + 10}
					fontSize={7}
					fill="rgba(255,255,255,0.25)"
					textAnchor="middle"
				>
					1
				</text>

				{/* Curve line */}
				{pathD ? (
					<path
						d={pathD}
						fill="none"
						stroke={color}
						strokeWidth={1.5}
						opacity={0.8}
					/>
				) : null}

				{/* Keyframe dots */}
				{keyframes.map((kf, index) => (
					<circle
						key={`${kf.at}-${kf.value}`}
						role="slider"
						aria-label={`Keyframe at ${kf.at}`}
						aria-valuenow={kf.value}
						cx={toSvgX(kf.at)}
						cy={toSvgY(kf.value)}
						r={draggingIndex === index ? DOT_R + 2 : DOT_R}
						fill={draggingIndex === index ? "#fff" : color}
						stroke="#fff"
						strokeWidth={1.5}
						className="cursor-grab active:cursor-grabbing"
						onPointerDown={(e) => handlePointerDown(index, e)}
						onContextMenu={(e) => handleRemove(index, e)}
					/>
				))}
			</svg>
		</Box>
	);
};

export default CurveEditor;
