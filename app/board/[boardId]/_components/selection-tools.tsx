"use client"

import { useSelectionBounds } from "@/hooks/use-selection-bounds"
import { useMutation, useSelf } from "@/liveblocks.config"
import { Camera, Color } from "@/types/canvas"
import { memo } from "react"
import { ColorPicker } from "./color-picker"
import { useDeleteLayers } from "@/hooks/use-delete-layers"
import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"
import { BringToFront, SendToBack, Trash2 } from "lucide-react"

interface SelectionToolsProps {
  camera: Camera
  setLastUsedColor: (color: Color) => void
}

export const SelectionTools = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {
  const selection = useSelf((me) => me.presence.selection)
  const selectionBounds = useSelectionBounds()
  const deleteLayers = useDeleteLayers()

  const moveToBack = useMutation((
    { storage },
  ) => {
    const liveLayerIds = storage.get('layerIds')

    const indexes: number[] = []
    const arr = liveLayerIds.toArray()

    for (let i = 0;i < arr.length;i++) {
      if (selection.includes(arr[i])) {
        indexes.push(i)
      }
    }
    for (let i = 0;i < indexes.length;i++) {
      liveLayerIds.move(indexes[i], i)
    }
  }, [selection])

  const moveToFront = useMutation((
    { storage },
  ) => {
    const liveLayerIds = storage.get('layerIds')

    const indexes: number[] = []
    const arr = liveLayerIds.toArray()

    for (let i = 0;i < arr.length;i++) {
      if (selection.includes(arr[i])) {
        indexes.push(i)
      }
    }
    for (let i = indexes.length - 1;i >= 0;i--) {
      liveLayerIds.move(indexes[i], arr.length - 1 - (indexes.length - 1 - i))
    }
  }, [selection])

  const setFill = useMutation((
    { storage },
    fill: Color,
  ) => {
    const liveLayers = storage.get('layers')
    setLastUsedColor(fill);

    selection.forEach((id) => {
      liveLayers.get(id)?.set('fill', fill)
    })
  }, [selection, setLastUsedColor])

  if (!selectionBounds) return null

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
  const y = selectionBounds.y + camera.y

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
      style={{ transform: `translate(calc(${x}px - 50%),calc(${y - 16}px - 100%))` }}
    >
      <ColorPicker
        onChange={setFill}
      />
      <div className="flex flex-col gap-y-0.5">
        <Hint label="Bring to front">
          <Button
            variant="board"
            size="icon"
            onClick={moveToFront}
          >
            <BringToFront />
          </Button>
        </Hint>
        <Hint label="Send to back" side="bottom">
          <Button
            variant="board"
            size="icon"
            onClick={moveToBack}
          >
            <SendToBack />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button
            variant='board'
            onClick={deleteLayers}>
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  )
})

SelectionTools.displayName = 'SelectionTools'