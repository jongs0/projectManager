import { createStore } from "@odemian/react-store";

interface User {
    username: String
    id: number
}

export const [currentUser, updateUser] = createStore<User>({
    username: "",
    id: NaN,
});

export const logout = () => {
    updateUser({
        username: "",
        id: NaN
    })
}

// Alles hierboven moet aangepast worden! Placeholder!!!