import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-zinc-300/20 backdrop-blur-md">
      <div className="container flex h-16 items-center px-5 pt-1">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2 font-clashgrotesk">
            <span className="font-medium text-[28px] font-clashgrotesk">
              {"< Mecords />"}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/ABHAY-100"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 font-clashgrotesk"
              >
                <span className="hidden sm:inline pt-[2px]">GITHUB</span>
              </Button>
            </a>
            <a
              href="https://www.abhayyy.tech"
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 font-clashgrotesk"
              >
                <span className="hidden sm:inline pt-[2px]">PORTFOLIO</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
