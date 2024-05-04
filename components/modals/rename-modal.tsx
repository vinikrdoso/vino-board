"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle
} from "@/components/ui/dialog"
import { useRenameModal } from "@/store/use-rename-modal"
import { FormEventHandler, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export function RenameModal() {
  const { isOpen, onClose, initialValues } = useRenameModal()
  const [title, setTitle] = useState(initialValues.title)
  const { mutate, pending } = useApiMutation(api.board.update)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    mutate({
      id: initialValues.id,
      title
    })
      .then(() => {
        toast.success("Board renamed")
        onClose()
      })
      .catch(() => toast.error("Failed to rename board"))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a new title for this board
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}