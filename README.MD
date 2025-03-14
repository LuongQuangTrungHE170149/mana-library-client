# Complete API Endpoints List

Here's a comprehensive list of all API endpoints used in the library management app, organized by category:

## Authentication Endpoints

- `POST /auth/login` - User login with credentials
- `POST /auth/register` - Create new user account
- `POST /auth/reset/request` - Request password reset
- `POST /auth/reset/verify` - Verify reset token
- `POST /auth/reset/complete` - Complete password reset
- `POST /auth/2fa/setup` - Set up two-factor authentication
- `POST /auth/2fa/verify` - Verify 2FA setup
- `POST /auth/2fa/login` - Login with 2FA code
- `POST /auth/oauth/{provider}` - OAuth authentication
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh authentication token

## User Endpoints

- `GET /users/me` - Get current user profile
- `PATCH /users/me` - Update user profile
- `POST /users/password` - Change password
- `GET /users/me/books/borrowed` - Get currently borrowed books
- `GET /users/me/books/history` - Get borrowing history
- `GET /users/me/books/favorites` - Get favorite books
- `POST /users/me/books/favorites/{bookId}` - Add book to favorites
- `DELETE /users/me/books/favorites/{bookId}` - Remove from favorites
- `GET /users/me/notifications` - Get user notifications
- `PATCH /users/me/notifications/{notificationId}` - Mark notification as read
- `GET /users` - Admin: Get all users
- `GET /users/{userId}` - Admin: Get specific user
- `PATCH /users/{userId}` - Admin: Update user
- `PATCH /users/{userId}/role` - Admin: Change user role
- `GET /users/metrics` - Admin: Get user metrics

## Book Endpoints

- `GET /books` - Get books catalog with filters
- `GET /books/{bookId}` - Get specific book details
- `GET /books/search` - Search books
- `GET /books/recommendations` - Get personalized recommendations
- `POST /books/{bookId}/borrow` - Borrow a book
- `POST /books/{bookId}/return` - Return a book
- `POST /books/{bookId}/reserve` - Reserve a book
- `DELETE /books/{bookId}/reserve` - Cancel reservation
- `GET /books/isbn/{isbn}` - Get book by ISBN/barcode

### Librarian & Admin Book Endpoints

- `POST /books` - Add new book
- `PATCH /books/{bookId}` - Update book details
- `PATCH /books/{bookId}/count` - Update book inventory count
- `DELETE /books/{bookId}` - Remove book
- `GET /books/stats` - Get borrowing statistics
- `GET /books/metrics` - Get dashboard metrics
- `POST /books/import` - Import books from file
- `GET /books/export` - Export books catalog
