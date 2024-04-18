import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EmptyTemplateProps {
  title: string;
  subtitle: string;
  img: string;
  showButton?: boolean;
}

export function EmptyTemplate({ title, subtitle, img, showButton }: EmptyTemplateProps) {
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
            <Button size='lg'>
              Create board
            </Button>
          )
        }
      </div>
    </div>
  )
}