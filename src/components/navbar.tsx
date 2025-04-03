import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import LikeButton from "@/components/like-button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-zinc-300/20 backdrop-blur-md">
      <div className="flex h-16 items-center px-5 pt-1 max-md:h-14 max-sm:px-4 max-[400px]:justify-center">
        <div className="flex">
          <Link
            href="/"
            className="flex items-center space-x-2 font-clashgrotesk"
          >
            <span className="font-medium text-[30px] font-clashgrotesk max-md:text-[27px] max-sm:mr-2">
              {"< Mecords />"}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ABHAY-100/mecords"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-[6px] font-clashgrotesk"
              >
                {/* <Star className="h-4 w-4 max-[400px]:hidden scale-[0.95]" /> */}
                <Github className="h-3 w-3 min-[400px]" />
                <span className="pt-[3px] text-[15px] max-[400px]:hidden">
                  GitHub
                </span>
              </Button>
            </a>

            <LikeButton />
          </div>
        </div>
      </div>
    </header>
  );
}
