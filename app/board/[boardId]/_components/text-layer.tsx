import { cn, colorToCss } from "@/lib/utils"
import { useMutation } from "@/liveblocks.config"
import { TextLayer } from "@/types/canvas"
import { Kalam } from "next/font/google"
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

const font = Kalam({
  subsets: ['latin'],
  weight: ['400']
})

interface TextLayerProps {
  id: string
  layer: TextLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96
  const scaleFactor = 0.5
  const fontSizeBasedOnHeight = height * scaleFactor
  const fontSizeBasedOnWidth = width * scaleFactor

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}
export function Text({ id, layer, onPointerDown, selectionColor }: TextLayerProps) {
  const { x, y, width, height, fill, value } = layer

  const updateValue = useMutation((
    { storage },
    newValue: string
  ) => {
    const liveLayers = storage.get('layers')

    liveLayers.get(id)?.set('value', newValue)
  }, [])

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value)
  }

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none'
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          'h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none',
          font.className
        )}
        style={{
          color: fill ? colorToCss(fill) : "#FF9922",
          fontSize: calculateFontSize(width, height)
        }} />
    </foreignObject>
  )
}