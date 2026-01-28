import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
return (
<>
    <main>
        <header>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
        </header>
        <div className="flex justify-center mt-10">
            {children}
        </div>
    </main>
</>
)
}
