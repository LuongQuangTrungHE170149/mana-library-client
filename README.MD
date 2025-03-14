# Complete API Endpoints List

Here's a comprehensive list of all API endpoints used in the library management app, organized by category:

## Authentication Endpoints

- `POST /api/v1/auth/login` - User login with credentials
- `POST /api/v1/auth/register` - Create new user account
- `POST /api/v1/auth/reset` - Reset password
- `POST /api/v1/auth/verify` - Verify account
- `POST /api/v1/auth/send-code` - Send verification code
- `GET /api/v1/auth/2fa` - Generate 2FA setup QR code
- `PUT /api/v1/auth/2fa` - Toggle 2FA
- `POST /api/v1/auth/refresh` - Refresh JWT token

## Book Endpoints

- `GET /api/v1/books` - Get all books (with filtering)
- `GET /api/v1/books/:bookId` - Get specific book details
- `POST /api/v1/books` - Create a new book
- `PATCH /api/v1/books/:bookId` - Update a book
- `DELETE /api/v1/books/:bookId` - Delete a book
- `GET /api/v1/books/search` - Search for books
- `POST /api/v1/books/:bookId/borrow` - Borrow a book
- `POST /api/v1/books/:bookId/return` - Return a book
- `POST /api/v1/books/:bookId/reserve` - Reserve a book
- `POST /api/v1/books/:bookId/cancel-reservation` - Cancel reservation
- `GET /api/v1/books/borrowed` - Get user's borrowed books
- `GET /api/v1/books/reserved` - Get user's reserved books
- `GET /api/v1/books/borrowed/:userId` - Get books borrowed by specific user (admin/librarian)
- `GET /api/v1/books/reserved/:userId` - Get books reserved by specific user (admin/librarian)

## User Endpoints

- `GET /api/v1/users` - Get current user profile
- `POST /api/v1/users` - Create a new user (admin only)
- `PATCH /api/v1/users/:userId` - Update user
- `DELETE /api/v1/users/:userId` - Delete user (admin only)

## Additional Endpoints (Custom Implementation)

These endpoints may need custom implementation on your server:

### User Features

- `GET /api/v1/users/favorites` - Get user's favorite books
- `POST /api/v1/users/favorites/:bookId` - Add book to favorites
- `DELETE /api/v1/users/favorites/:bookId` - Remove from favorites
- `GET /api/v1/users/notifications` - Get user notifications
- `PATCH /api/v1/users/notifications/:notificationId` - Mark notification as read

### Admin Features

- `GET /api/v1/admin/metrics` - Get system metrics and dashboard data
- `GET /api/v1/books/stats` - Get borrowing statistics
- `POST /api/v1/books/import` - Import books from file
- `GET /api/v1/books/export` - Export books catalog
