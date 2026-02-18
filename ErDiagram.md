# ER Diagram — Database Design

## 🗄️ Tables

### USERS
- user_id (PK)
- username
- email
- profile_image
- bio
- created_at

### POSTS
- post_id (PK)
- user_id (FK)
- content
- media_url
- category_id (FK)
- created_at

### COMMENTS
- comment_id (PK)
- post_id (FK)
- user_id (FK)
- text
- created_at

### LIKES
- like_id (PK)
- post_id (FK)
- user_id (FK)

### CATEGORIES
- category_id (PK)
- name
- description

### FOLLOWERS
- id (PK)
- follower_id (FK)
- following_id (FK)

## 🔗 Relationships
- USERS 1 --- N POSTS
- POSTS 1 --- N COMMENTS
- USERS N --- N POSTS (via LIKES)
- POSTS N --- 1 CATEGORIES
- USERS N --- N USERS (FOLLOWERS)
