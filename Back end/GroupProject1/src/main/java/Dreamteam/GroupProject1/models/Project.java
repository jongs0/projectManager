package Dreamteam.GroupProject1.models;

import jakarta.persistence.*;

@Entity
public class Project {
    @GeneratedValue
    @Id
    Long id;

    String name;

    @OneToMany
    Task task;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
