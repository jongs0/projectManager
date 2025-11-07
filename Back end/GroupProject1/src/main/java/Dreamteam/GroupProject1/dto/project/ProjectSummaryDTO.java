package Dreamteam.GroupProject1.dto.project;

import Dreamteam.GroupProject1.models.Project;

public record ProjectSummaryDTO(
        Long id,
        String name,
        String description

) {
    public static ProjectSummaryDTO fromEntity(Project project) {
        return new ProjectSummaryDTO(
                project.getId(),
                project.getName(),
                project.getDescription()
        );
    }
}
