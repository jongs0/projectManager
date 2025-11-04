package Dreamteam.GroupProject1.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Project {
    @GeneratedValue
    @Id
    Long id;

    String name;

    @OneToMany
    @JoinColumn(name = "taskId")
    List<Task> tasks;

    public Project(Long id, String name, List<Task> tasks) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return tasks;
    }
}
