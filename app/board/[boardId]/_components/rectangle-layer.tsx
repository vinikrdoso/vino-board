import { colorToCss } from "@/lib/utils"
import { RectangleLayer } from "@/types/canvas"

interface RectangleLayerProps {
  id: string
  layer: RectangleLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export function Rectangle({ id, layer, onPointerDown, selectionColor }: RectangleLayerProps) {
  const { x, y, width, height, fill } = layer

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#FF9922"}
      stroke={selectionColor || "transparent"}
    />

  )
}