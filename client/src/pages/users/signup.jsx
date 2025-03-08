import { setUserToken } from "@/utils/setUserToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";

export async function getServerSideProps(context) {
    const cookies = new Cookies(context.req.headers.cookie);
    const userId = cookies.get("user_token");
    if (!userId) {
        return { props: { userIdCookie: null } };
    }
    return { props: { userIdCookie: userId } };
}

export default function Signup({ userIdCookie }) {
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [regNumber, setRegNumber] = useState("");
    const [username, setUsername] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (userIdCookie) {
            setStep(3);
            setTimeout(() => setMessage({ errorMsg: "", successMsg: "Redirecting you ..." }), 500);
            setTimeout(() => router.push("/users/dashboard"), 800);
        }
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage({ errorMsg: "", successMsg: "" });

        const response = await fetch("http://localhost:5000/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
            setStep(2);
            setMessage({ errorMsg: "", successMsg: data.msg });
        } else {
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setMessage({ errorMsg: "", successMsg: "" });

        const response = await fetch("http://localhost:5000/user/signup/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, contactNumber, regNumber, username }),
        });

        const data = await response.json();
        if (response.ok) {
            setUserToken(data.user_id);
            setStep(3);
            setMessage({ errorMsg: "", successMsg: "Signup successful! Redirecting..." });
            setTimeout(() => router.push("/users/dashboard"), 1000);
        } else {
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#000814] text-white p-4">
            <FiArrowLeft onClick={() => router.push("/")} size={30} className="cursor-pointer absolute top-5 left-5 text-gray-300 hover:text-white transition" />
            <div className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Signup Page</div>

            <div className="w-full max-w-2xl p-6 rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
                <div className="flex justify-around mb-6">
                    {["Verify Email", "Complete Signup", "Go to Dashboard"].map((text, index) => (
                        <div key={index} className={`w-full py-2 text-center rounded-lg transition ${step > index ? "bg-blue-600" : "bg-gray-700 opacity-40"}`}>
                            {text}
                        </div>
                    ))}
                </div>
                {message.errorMsg && <div className="mb-4 text-red-400 text-center">{message.errorMsg}</div>}
                {message.successMsg && <div className="mb-4 text-green-400 text-center">{message.successMsg}</div>}

                <div>
                    {step === 1 && (
                        <form className="flex flex-col" onSubmit={handleSignup}>
                            <label className="mb-2 text-lg">Enter your email</label>
                            <input className="p-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <button className="mt-4 p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition">Verify</button>
                        </form>
                    )}
                    {step === 2 && (
                        <form className="flex flex-col" onSubmit={handleVerifyOtp}>
                            <label className="mb-2">Enter OTP</label>
                            <input className="p-2 bg-gray-800 rounded-lg" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                            <label className="mt-4 mb-2">Full Name</label>
                            <input className="p-2 bg-gray-800 rounded-lg" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            <label className="mt-4 mb-2">Enter Registration Number</label>
                            <input className="p-2 bg-gray-800 rounded-lg" type="text" value={regNumber} onChange={(e) => setRegNumber(e.target.value)} required />
                            <label className="mt-4 mb-2">Contact Number</label>
                            <input className="p-2 bg-gray-800 rounded-lg" type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                            <button className="mt-4 p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition">Complete Signup</button>
                        </form>
                    )}
                    {step === 3 && (
                        <div className="text-center">
                            <p className="text-green-400 mb-4">Your account has been created successfully!</p>
                            <button onClick={() => router.push("/users/dashboard")} className="p-2 bg-[#161D29] hover:bg-blue-700 rounded-lg transition">Go to Dashboard</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
