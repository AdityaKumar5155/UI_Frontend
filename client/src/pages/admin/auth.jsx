import { setAdminToken } from "@/utils/setAdminToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";

export async function getServerSideProps(context) {
    const cookies = new Cookies(context.req.headers.cookie);
    const adminId = cookies.get("admin_token");
    if (!adminId) {
        return {
            props: { adminIdCookie: null },
        };
    }
    return {
        props: { adminIdCookie: adminId },
    };
}

export default function Signin({ adminIdCookie }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
    const router = useRouter();

    useEffect(() => {
        // If cookie found, Redirect to dashboard
        if (adminIdCookie) {
            setStep(2); // Skip auth steps

            setTimeout(() => {
                // Set success message
                setMessage({
                    errorMsg: "",
                    successMsg: "Redirecting you ...",
                });
            }, 500);

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 800);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/auth`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            console.log(data);
            setStep(2); // Move to next step on the same page

            setAdminToken(data.admin_token); // set cookie when signed up
        } else {
            console.error(`Failed with status code ${response.status}`);
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#000814] text-white p-4">
            {/* Back button */}
            <FiArrowLeft
                onClick={() => router.push("/")}
                size={30}
                className="cursor-pointer absolute top-5 left-5 text-gray-300 hover:text-white transition"
            />

            {/* Page heading */}
            <div className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Admin Authentication Page
            </div>

            {/* Page Content */}
            <div className="w-full max-w-2xl p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
                {/* Steps Nav */}
                <div className="flex justify-around mb-6">
                    {["Verify Credentials", "Go to Dashboard"].map((text, index) => (
                        <div
                            key={index}
                            className={`w-full py-2 text-center rounded-lg transition ${
                                step > index ? "bg-blue-600" : "bg-gray-700 opacity-40"
                            }`}
                        >
                            {text}
                        </div>
                    ))}
                </div>

                {/* Error Message */}
                {message.errorMsg && (
                    <div className="mb-4 text-red-400 text-center">{message.errorMsg}</div>
                )}

                {/* Success Message */}
                {message.successMsg && (
                    <div className="mb-4 text-green-400 text-center">{message.successMsg}</div>
                )}

                {/* Steps Content */}
                <div>
                    {/* Step 1 Content */}
                    {step === 1 && (
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <label className="mb-2 text-lg">Enter your Registered Email address</label>
                            <input
                                className="p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <label className="mt-4 mb-2 text-lg">Enter your Password</label>
                            <input
                                className="p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <p className="text-sm text-gray-400 mt-6">
                                *You have the option to designate yourself as an admin for testing purposes by following this{" "}
                                <a
                                    href="https://invite-developers.vercel.app/"
                                    target="_blank"
                                    className="text-blue-400 hover:underline"
                                >
                                    link.
                                </a>
                            </p>

                            <button
                                type="submit"
                                className="mt-4 p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition"
                            >
                                Verify
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setEmail("invite.testing@gmail.com");
                                    setPassword("invite123");
                                }}
                                className="mt-4 p-2 bg-gray-700 hover:bg-gray-800 rounded-lg transition"
                            >
                                Use Test Credentials
                            </button>
                        </form>
                    )}

                    {/* Step 2 Content */}
                    {step === 2 && (
                        <div className="text-center">
                            <p className="text-green-400 mb-4">
                                Hey there! Welcome back, you're successfully signed in!
                            </p>
                            <button
                                onClick={() => router.push("/admin/dashboard")}
                                className="p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition"
                            >
                                Go to your dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}