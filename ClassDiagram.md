# Class Diagram — Hobbies Platform

## 🧩 Main Classes

### User
- id
- username
- email
- profileImage
- hobbies[]
- followers[]
- following[]

### Post
- id
- userId
- content
- mediaUrl
- category
- likesCount
- commentsCount
- createdAt

### Comment
- id
- postId
- userId
- text
- createdAt

### HobbyCategory
- id
- name
- description

### Like
- id
- userId
- postId

## 🔗 Relationships
- User creates many Posts
- Post has many Comments
- Post belongs to HobbyCategory
- User can Like many Posts
