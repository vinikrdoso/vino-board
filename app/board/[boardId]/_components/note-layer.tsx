import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils"
import { useMutation } from "@/liveblocks.config"
import { NoteLayer } from "@/types/canvas"
import { Kalam } from "next/font/google"
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

const font = Kalam({
  subsets: ['latin'],
  weight: ['400']
})

interface NoteLayerProps {
  id: string
  layer: NoteLayer
  onPointerDown: (e: React.PointerEvent, id: string) => void
  selectionColor?: string
}

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96
  const scaleFactor = 0.15
  const fontSizeBasedOnHeight = height * scaleFactor
  const fontSizeBasedOnWidth = width * scaleFactor

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}
export function Note({ id, layer, onPointerDown, selectionColor }: NoteLayerProps) {
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
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
        backgroundColor: fill ? colorToCss(fill) : "#FF9922",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Note"}
        onChange={handleContentChange}
        className={cn(
          'h-full w-full flex items-center justify-center Note-center drop-shadow-md outline-none',
          font.className
        )}
        style={{
          color: fill ? getContrastingTextColor(fill) : "#FF9922",
          fontSize: calculateFontSize(width, height)
        }} />
    </foreignObject>
  )
}