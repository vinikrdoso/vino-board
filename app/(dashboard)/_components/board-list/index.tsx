'use client'

import { EmptyTemplate } from "../empty-template";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { BoardCard, BoardCardSkeleton } from "../board-card";
import { NewBoardButton } from "../new-board-button";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string
  }
}

export function BoardList({ orgId, query }: BoardListProps) {
  const { favorites, search } = query
  const data = useQuery(api.boards.get, { orgId })

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {favorites ? 'Favorite boards' : 'Team boards'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )
  }

  if (!data?.length && search) {
    return <EmptyTemplate title='No results found!' subtitle="Try searching for something else" img="/empty-search.svg" />
  }

  if (!data?.length && favorites) {
    return <EmptyTemplate title='No favorites board!' subtitle="Try favoriting a board" img="/empty-favorites.svg" />
  }

  if (!data?.length) {
    return <EmptyTemplate title='Create your first board!' subtitle="Start by creating a board for your organization" img="/note.svg" showButton />
  }


  return (
    <div>
      <h2 className="text-3xl">
        {favorites ? 'Favorite boards' : 'Team boards'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} disabled={false} />
        {data?.map(board => {
          return (
            <BoardCard
              key={board._id}
              id={board._id}
              title={board.title}
              imageUrl={board.imageUrl}
              authorId={board.authorId}
              authorName={board.authorName}
              createdAt={board._creationTime}
              orgId={board.orgId}
              isFavorite={false}
            />
          )
        })}
      </div>
    </div>
  )
}