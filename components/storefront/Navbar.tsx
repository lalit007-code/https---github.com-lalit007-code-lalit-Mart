import Link from "next/link";

export function Navbar() {
  return (
    <nav className="w-full max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 py-5 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="#">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Lalit<span className="text-primary">Mart</span>
          </h1>
        </Link>
      </div>
    </nav>
  );
}
