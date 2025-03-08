import { useRouter } from "next/router";

function Header() {
    const router = useRouter();

    return (
        <header className="absolute w-full z-30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Desktop navigation */}
                    
                </div>
            </div>
        </header>
    );
}

export default Header;
