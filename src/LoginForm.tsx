import { useState } from "react";
import useUserContext from "./contexts/UserContext";
import type { SubmitEvent } from "react";


export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, SetIsSumitting] = useState(false);

    const {login} = useUserContext();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="login-dropdown__label" htmlFor="login-email">
                    Email
                </label>
                <input name="email" 
                className="login-dropdown__input" 
                type="email" 
                autoComplete="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <label className="login-dropdown__label" htmlFor="login-password">
                    Password
                </label>
                <input name="password" 
                className="login-dropdown__input" 
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};