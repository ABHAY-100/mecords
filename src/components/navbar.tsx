import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-zinc-300/20 backdrop-blur-md">
      <div className="flex h-16 items-center px-5 pt-1 max-md:h-14 max-sm:px-4 max-[400px]:justify-center">
        <div className="flex">
          <Link
            href="/"
            className="flex items-center space-x-2 font-clashgrotesk"
          >
            <span className="font-medium text-[28px] font-clashgrotesk max-md:text-[26px] max-sm:mr-2">
              {"< Mecords />"}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center space-x-2 max-[400px]:space-x-0">
            <a
              href="https://github.com/ABHAY-100"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 font-clashgrotesk max-sm:scale-90"
              >
                <Github className="h-4 w-4 max-[400px]:block hidden" />
                <span className="pt-[2px] max-[400px]:hidden">GITHUB</span>
              </Button>
            </a>
            <a
              href="https://www.abhayyy.tech"
              target="_blank"
              rel="noreferrer"
              className="flex items-center max-sm:hidden"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 font-clashgrotesk max-sm:scale-90"
              >
                {/* <User className="h-4 w-4 max-sm:block hidden" /> */}
                <span className="hidden sm:inline pt-[2px]">PORTFOLIO</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
