"use client"

import Image from "next/image";

import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EmptyTemplateProps {
  title: string;
  subtitle: string;
  img: string;
  showButton?: boolean;
}

export function EmptyTemplate({ title, subtitle, img, showButton }: EmptyTemplateProps) {
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.board.create)
  const router = useRouter()

  function onClick() {
    if (!organization) return

    mutate({
      orgId: organization.id,
      title: 'test'
    })
      .then((id) => {
        toast.success('Board created')
        router.push(`/board/${id}`)
      })
      .catch(() => {
        toast.error('Failed to create board')
      })
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src={img}
        height={showButton ? 110 : 140}
        width={showButton ? 110 : 140}
        alt="Empty"
      />
      <h2 className="text-2xl font-semibold mt-6">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        {subtitle}
      </p>
      <div className="mt-6">
        {
          showButton && (
            <Button
              onClick={onClick}
              size='lg'
              disabled={pending}
            >
              Create board
            </Button>
          )
        }
      </div>
    </div>
  )
}