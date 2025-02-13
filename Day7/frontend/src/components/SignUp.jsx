import React, { useState } from "react";

const SignUp = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Function to send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch("http://localhost:8000/api/otps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const respObj = await resp.json();
            if (respObj.success) {
                setIsOtpSent(true);
                alert("OTP sent to your email!");
            } else {
                alert(respObj.message);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    // Function to create a user after verifying OTP
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const resp = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, password }),
            });

            const respObj = await resp.json();
            if (respObj.success) {
                alert("User registered successfully!");
            } else {
                alert(respObj.message);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {!isOtpSent ? (
                // OTP request form
                <form onSubmit={handleSendOtp}>
                    <label>Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <button type="submit">Send OTP</button>
                </form>
            ) : (
                // OTP verification & user registration form
                <form onSubmit={handleSignUp}>
                    <label>OTP:
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    </label>
                    <label>Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <label>Confirm Password:
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
};

export default SignUp;
