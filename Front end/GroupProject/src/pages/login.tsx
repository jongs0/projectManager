import { currentUser, updateUser } from "../stores/userStore.ts"

const Login = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh"}}>
            <>login here hi</> <br />
            <button onClick={() => {
                updateUser({
                    username: "Rei",
                    id: NaN
                })
            }}>temp 'login'</button>
            <br/><>name: {currentUser().username}</>
        </div>
    )

}

export default Login