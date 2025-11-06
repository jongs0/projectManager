package Dreamteam.GroupProject1.models.enums;

public enum Role {
    CLIENT,
    DEVELOPER,
    PROJECTMANAGER,
    USER;

    @Override
    public String toString() {
        switch (this) {
            case CLIENT:
                return "Client";
            case DEVELOPER:
                return "Developer";
            case PROJECTMANAGER:
                return "Project Manager";
            case USER:
                return "User";

            default:
                throw new IllegalArgumentException();
        }
    }
}