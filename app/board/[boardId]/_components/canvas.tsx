"use client"

import { useState } from "react"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"
import { CanvasMode, CanvasState } from "@/types/canvas"
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config"

interface CanvasProps {
  boardId: string
}

export function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None })

  const { redo, undo } = useHistory()
  const canRedo = useCanRedo()
  const canUndo = useCanUndo()

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={redo}
        undo={undo}
      />

    </main>
  )
}