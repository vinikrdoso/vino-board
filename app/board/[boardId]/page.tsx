import { Room } from "@/components/room";

import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";

interface BoardIdPageProps {
  params: {
    boardId: string
  }
}

export default function BoardIdPage({ params }: BoardIdPageProps) {
  const { boardId } = params

  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />
    </Room>
  )
}