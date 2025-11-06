package Dreamteam.GroupProject1.dto.task;

import Dreamteam.GroupProject1.models.Task;

public record TaskUpdateDTO(

        String name,
        String description

) {
    public void updateTask(Task task) {

        if (name != null) task.setName(name);
        if (description != null) task.setDescription(description);
    }
}
