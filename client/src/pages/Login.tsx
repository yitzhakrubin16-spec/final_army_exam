import { useState, type SubmitEvent } from "react"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../services/auth.service"


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = useAuthStore((state) => state.login)
    
    const navigate = useNavigate()
    
    async function handleSubmit(e:SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const response = await loginRequest(email, password)
            login(response.data.email, response.data.token)
            setError("")
            navigate("/")
        } catch (err){
            if(err instanceof Error){
                setError(err.message)
            }
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
    </form>
  )
}

export default Login