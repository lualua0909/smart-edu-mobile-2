import { gql } from '@apollo/client'

export const NOTIFICATION_LIST = gql`
    query ($page: Int = 1, $limit: Int = 50) {
        Notifications(page: $page, limit: $limit) {
            data {
                title
                status
                content
                created_at
                user {
                    id
                    first_name
                }
            }
            total
        }
    }
`

export const COURSE_LIST = gql`
    query ($page: Int = 1, $limit: Int = 50, $is_roadmap: Int) {
        Courses(page: $page, limit: $limit, is_roadmap: $is_roadmap) {
            data {
                id
                title
                rating
                total_lectures
                slug
                group_id
                mentor {
                    id
                    first_name
                }
                course_group {
                    id
                    name
                }
            }
            total
        }
    }
`

export const ROADMAP_LIST = gql`
    query ($course_id: Int!) {
        Roadmaps(course_id: $course_id) {
            data {
                sub_course {
                    id
                    title
                    rating
                    total_lectures
                    slug
                    group_id
                    mentor {
                        id
                        first_name
                    }
                }
            }
            total
        }
    }
`

export const COURSE_GROUP_LIST = gql`
    query ($page: Int = 1, $limit: Int = 50, $level: Int) {
        CourseGroups(page: $page, limit: $limit, level: $level) {
            data {
                id
                name
                description
            }
            total
        }
    }
`
