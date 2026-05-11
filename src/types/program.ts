export interface FitnessProgram {
    name: string;
    startDate: Date;
    endDate: Date;
    completedDays: string[]; // We will store dates as ISO strings "2024-05-11"
}
