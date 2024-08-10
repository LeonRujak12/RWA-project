export class CreateTodoDto {
    readonly title: string;
    readonly description: string;
    readonly projectName: string;
    readonly isCompleted?: boolean;
}