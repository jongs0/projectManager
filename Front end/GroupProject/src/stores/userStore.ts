import { createStore } from "@odemian/react-store";

interface User {
    email: String
    password: String
    id: number
}

export const [currentUser, updateUser] = createStore<User>({
    email: "",
    password: "",
    id: NaN
});

export const logout = () => {
    updateUser({
        email: "",
        password: "",
        id: NaN
    })
}
// Alles hierboven moet aangepast worden! Placeholder!!!