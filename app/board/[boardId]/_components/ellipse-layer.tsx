import { colorToCss } from "@/lib/utils"
import { EllipseLayer } from "@/types/canvas"

interface EllipseLayerProps {
  id: string
  layer: EllipseLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

export function Ellipse({ id, layer, onPointerDown, selectionColor }: EllipseLayerProps) {
  const { x, y, width, height, fill } = layer

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      cx={layer.width / 2}
      cy={layer.height / 2}
      rx={layer.width / 2}
      ry={layer.height / 2}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#FF9922"}
      stroke={selectionColor || "transparent"}
    />

  )
}