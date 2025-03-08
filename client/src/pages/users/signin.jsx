import { setUserToken } from "@/utils/setUserToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";

export async function getServerSideProps(context) {
    const cookies = new Cookies(context.req.headers.cookie);
    const userId = cookies.get("user_token");
    if (!userId) {
        return {
            props: { userIdCookie: null },
        };
    }
    return {
        props: { userIdCookie: userId },
    };
}

export default function Signin({ userIdCookie }) {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
    const router = useRouter();

    useEffect(() => {
        if (userIdCookie) {
            setStep(3);
            setTimeout(() => {
                setMessage({
                    errorMsg: "",
                    successMsg: "Redirecting you ...",
                });
            }, 500);
            setTimeout(() => {
                router.push("/users/dashboard");
            }, 800);
        }
    }, []);

    const handleVerifyEmail = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            setStep(2);
        } else {
            setMessage({ errorMsg: data.msg, successMsg: "" });
            setTimeout(() => {
                setMessage({
                    errorMsg: "Redirecting you to SignUp ...",
                    successMsg: "",
                });
            }, 1700);
            setTimeout(() => {
                router.push("/users/signup");
            }, 2500);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/signin/verify`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            setStep(3);
            setUserToken(data.user_id);
        } else {
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#000814] text-white p-4">
            <FiArrowLeft
                onClick={() => router.push("/")}
                size={30}
                className="cursor-pointer absolute top-5 left-5 text-gray-300 hover:text-white transition"
            />
            <div className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Signin Page</div>

            <div className="w-full max-w-2xl p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
                <div className="flex justify-around mb-6">
                    {["Verify Email", "OTP Verification", "Go to Dashboard"].map((text, index) => (
                        <div key={index} className={`w-full py-2 text-center rounded-lg transition ${step > index ? "bg-blue-600" : "bg-gray-700 opacity-40"}`}>
                            {text}
                        </div>
                    ))}
                </div>
                {message.errorMsg && <div className="mb-4 text-red-400 text-center">{message.errorMsg}</div>}
                {message.successMsg && <div className="mb-4 text-green-400 text-center">{message.successMsg}</div>}

                <div>
                    {step === 1 && (
                        <form className="flex flex-col" onSubmit={handleVerifyEmail}>
                            <label className="mb-2 text-lg">Enter your Registered Email address</label>
                            <input
                                className="p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button className="mt-4 p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition">Verify</button>
                        </form>
                    )}
                    {step === 2 && (
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <label className="mb-2 text-lg">Enter Verification Code</label>
                            <input
                                className="p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <button className="mt-4 p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition">Submit</button>
                        </form>
                    )}
                    {step === 3 && (
                        <div className="text-center">
                            <p className="text-green-400 mb-4">Your account has been verified successfully!</p>
                            <button onClick={() => router.push("/users/dashboard")} className="p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition">Go to Dashboard</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}