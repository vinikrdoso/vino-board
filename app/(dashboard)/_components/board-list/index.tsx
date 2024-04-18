import { EmptyTemplate } from "../empty-template";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string
  }
}

export function BoardList({ orgId, query }: BoardListProps) {
  const data = []

  if (!data?.length && query.search) {
    return <EmptyTemplate title='No results found!' subtitle="Try searching for something else" img="/empty-search.svg" />
  }

  if (!data?.length && query.favorites) {
    return <EmptyTemplate title='No favorites board!' subtitle="Try favoriting a board" img="/empty-favorites.svg" />
  }

  if (!data?.length) {
    return <EmptyTemplate title='Create your first board!' subtitle="Start by creating a board for your organization" img="/note.svg" showButton />
  }


  return (
    <>
      <p>{orgId}</p>
      <p>{query?.favorites}</p>
      <p>{query?.search}</p>
    </>
  )
}