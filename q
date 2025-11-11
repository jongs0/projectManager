[33m63788ac[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mdevelopment[m[33m, [m[1;31morigin/development[m[33m)[m Updated comment controller to check for roles
[33m6cd5320[m Changed project model to have cascading for tasks, changed tasks model to have cascading for comments
[33m11c6680[m Fixed commentservice
[33m89a65ea[m Comment controller & service
[33mc75a316[m Updated projectcontroller to have correct exception handling message
[33m5c28f04[m Finished project service, controller & custom exception handling
[33m031046f[m Added getUserById functionality in AppUserService, required for role checks
[33m6ca6eb3[m Added findById functionality in AppUserService, required for role checks
[33m295d932[m Added role check to use in services
[33m1113a54[m Added conditional for email, has to be unique
[33m1c1229b[m Removed user role
[33m0eb9cfc[m Fixed repo find by method, was in the wrong one
[33ma9745d9[m Added find and exist by email for repository
[33m53f3ff5[m Added 'Done' boolean
[33mbaafad8[m Removed redundant line
[33me5b6566[m updated formatting TaskSummaryDTO
[33m174a17a[m Added optional to team -> project relationship,enabling team reassignment
[33m761af62[m Added admin dto to update a user's role and if needed, reset email/pw (albeit rudimentary)
[33me84878a[m Added boolean isDone to task model and dto
[33m1af8191[m updated task summary dto to include a list of watchers
[33mdffb00f[m added project dto's
[33md0c7270[m fixed team summary dto
[33m1e6606d[m Updated user dto's, fixed role enum, fixed minor issues
[33m3355f4d[m Added team dto's
[33m2ad6e84[m added fixed comment dto's
[33m5b893fa[m Created task dto's
[33mf6a0960[m Added comment dto's
[33m499170b[m Created AppUserDto's
[33m5568ce2[m added description field setter to project
[33mea0f710[m added description field to projects
[33m92644bb[m Added AppUser create and summary dto's
[33m1b2627f[m Added setters to models for teams, tasks and comments
[33md9534d3[m Fixed relationship between project and team
[33m937e0ec[m Fixed various relationship issues, added AppUserDTO's
[33m45a566a[m Removed wrong Email annotation and put project DTOs in separate folder
[33m6bc773a[m Project backend: added controller, service and DTOs
[33m476199f[m added cascading to AppUser to simplify deleting users from a team
[33m7f869c0[m Fixed AppUser & Task model to have proper join columns
[33m6277d0c[m Project model: fixed task -> task list
[33m77a6bf7[m Added getters/setters to Team entity
[33m92da4d4[m Created Team model, updated AppUser model to accomodate
[33m79f3b94[m Update Comment.java
[33m93d512f[m Created comment model
[33m7a5cda4[m Updated AppUser model
[33m9f886a6[m Updated AppUser model
[33ma3c0e60[m Project model: add getters and setters
[33m09a8795[m Created project model
[33m593e897[m Add project model
[33m50ca36e[m Created task entity
[33m2367bcc[m Changed user to appUser
[33m00565b3[m Save current local work to move to development
[33m8478012[m[33m ([m[1;32mmain[m[33m)[m Initial setup (#1)
[33mbc9ae98[m Initial frontend setup
