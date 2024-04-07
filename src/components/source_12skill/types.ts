interface DataTCourse {
    id: string | number
    price: number | null
    ios_price: number | null
    isOffline: boolean
    process: number
    rating: number
    release_date: string | null
    slug: string
    title: string
    new_price: number | null
    old_price: number | null
    total_lectures: number
}
interface DataTCourse12SkillChildren extends DataTCourse {}

interface DataTCourse12Skill extends DataTCourse {
    isFinish: boolean
    processBefore: number
    processAfter: number
    score: number
    total_course: number
    children: DataTCourse12SkillChildren[]
}
