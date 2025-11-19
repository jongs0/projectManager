package Dreamteam.GroupProject1.models.enums;

public enum Role {
    CLIENT,
    DEVELOPER,
    PROJECTMANAGER;

    public String toLower() {
        return this.name().toLowerCase();
    }
}
