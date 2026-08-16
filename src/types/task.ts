export type Priority = 'LOW' | 'MEDIUM' | 'HIGH'
export type Status = 'TOOD' | 'IN_PROGRESS' | 'DONE'

export interface Task{
    id: string
    title: string
    description: string
    priority: Priority
    status: Status
    createdAt: string
}