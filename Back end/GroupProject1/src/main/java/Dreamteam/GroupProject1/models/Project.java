package Dreamteam.GroupProject1.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Project {
    @GeneratedValue
    @Id
    Long id;
    String name;
    String description;

    @OneToMany
    @JoinColumn(name = "taskId")
    List<Task> tasks;

    @OneToMany(mappedBy = "project")
    List<Team> teams;

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

    public List<Team> getTeams() {
        return teams;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
