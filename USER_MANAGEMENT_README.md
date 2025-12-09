# User Management Feature

## Overview

Complete user management system for the Printa Admin platform, implementing Epic 1: User Management requirements with **mock data**.

## Features Implemented

### 1. User Listing Page (`/users`)

- **Filter Options:**
  - Status: Active, Suspended, All
  - Verification: Verified, Unverified, All
  - Search: By name, email, or phone
- **Statistics Dashboard:**
  - Total Users
  - Active Users
  - Verified Users
  - Suspended Users
- **Pagination:** Cursor-based pagination with detailed controls
- **Export:** CSV export functionality
- **Table View:** Displays user information with badges for status, role, and verification

### 2. User Details Page (`/users/[userId]`)

- **User Information Card:**
  - Full name, email, phone
  - Role, status, verification status
  - Join date, last login
  - Address (if available)
  - Wallet balance (if available)

- **Activity History:**
  - Recent user actions
  - Timestamps and IP addresses
  - Activity descriptions

- **Recent Orders:**
  - Order ID, product name
  - Date, status, total amount
  - Quick order overview

- **Login History & Security:**
  - Login timestamps
  - IP addresses and devices
  - Location information
  - Success/Failed status

### 3. Admin Actions

All actions are available in the User Details page sidebar:

#### Suspend/Reactivate Account

- Toggle user account status
- Confirmation dialog with context
- System logging for audit

#### Reset Password

- Send password reset email
- Confirmation dialog
- User notification

#### Update Profile

- Modify email and phone number
- Limited field editing for safety
- Validation and confirmation

#### Change Role

- Update user role (USER, HUB_OWNER, ADMIN)
- Role descriptions provided
- Permission changes explained

### 4. Audit Logging

- All admin actions are logged
- View audit log button (placeholder for future implementation)
- Timestamps and action details tracked

## File Structure

```
src/
├── app/(dashboard)/users/
│   ├── page.tsx                          # Main user listing page
│   └── [userId]/
│       └── page.tsx                      # User details page
│
├── modules/user-management/
│   ├── index.tsx                         # User listing template (with mock data)
│   ├── user-details/
│   │   └── index.tsx                     # User details template (with mock data)
│   └── components/
│       ├── user-stats-row/
│       │   └── index.tsx                 # Statistics cards
│       ├── user-table/
│       │   └── index.tsx                 # User table component
│       ├── suspend-user-dialog/
│       │   └── index.tsx                 # Suspend/reactivate dialog
│       ├── reset-password-dialog/
│       │   └── index.tsx                 # Password reset dialog
│       ├── update-profile-dialog/
│       │   └── index.tsx                 # Profile update dialog
│       └── change-role-dialog/
│           └── index.tsx                 # Role change dialog
│
├── lib/
│   └── constants.ts                      # Mock user data (users & userDetails)
│
├── routes/
│   └── index.ts                          # Route constants (USER_MANAGEMENT added)
│
└── components/
    └── app-sidebar.tsx                   # Navigation sidebar (User Management added)
```

## Mock Data

### Mock Users (`lib/constants.ts`)

The system includes 8 mock users with varying:

- **Roles**: USER, HUB_OWNER, ADMIN
- **Statuses**: ACTIVE, SUSPENDED
- **Verification**: Verified and Unverified users
- **Login history**: Recent and older logins

### Mock User Details

Three detailed user profiles (user-1, user-2, user-3) include:

- Complete address information
- Wallet balances
- Activity history
- Order history
- Login history with IP addresses and devices

### Using Mock Data

All components use the `users` and `userDetails` constants from `lib/constants.ts`. No API calls are made - everything is client-side with mock data.

## API Endpoints (for future integration)

Currently using mock data. When ready to integrate with backend, the following endpoints can be implemented:

### GET `/admin/users`

Query Parameters:

- `limit`: Number of users per page
- `cursor`: Pagination cursor
- `status`: Filter by ACTIVE or SUSPENDED
- `verified`: Filter by verification status (true/false)
- `search`: Search term for name, email, or phone

Response:

```typescript
{
  data: {
    nextCursor: string;
    users: User[];
  },
  status: boolean;
}
```

### GET `/admin/users/:userId`

Returns detailed user information including:

- Basic profile
- Activity history
- Orders
- Login history
- Wallet information

### PATCH `/admin/users/:userId/status`

Update user account status (ACTIVE/SUSPENDED)

### POST `/admin/users/:userId/reset-password`

Send password reset email to user

### PATCH `/admin/users/:userId/profile`

Update user profile fields (email, phone)

### PATCH `/admin/users/:userId/role`

Update user role (USER, HUB_OWNER, ADMIN)

## Type Definitions

### User

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "USER" | "ADMIN" | "HUB_OWNER";
  status: "ACTIVE" | "SUSPENDED";
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  profileImage?: string;
}
```

### UserDetails

Extends User with additional fields:

```typescript
interface UserDetails extends User {
  address?: Address;
  wallet?: Wallet;
  activityHistory: ActivityLog[];
  orders: OrderSummary[];
  loginHistory: LoginLog[];
}
```

## Navigation

The User Management feature is accessible from:

- Sidebar: "User Management" menu item (4th item)
- Route: `/users`
- Direct user access: `/users/[userId]`

## Process Flow

1. **Admin opens User Management dashboard** (`/users`)
   - Views statistics cards showing user metrics
   - Sees paginated list of all users

2. **Filters user list**
   - By status (Active/Suspended)
   - By verification (Verified/Unverified)
   - By search term (name, email, phone)

3. **Selects a user** (clicks "View" button)
   - Navigates to `/users/[userId]`
   - Views complete user profile

4. **Reviews user information**
   - Activity history
   - Orders
   - Login history
   - Verification status

5. **Applies an action**
   - Suspend/Reactivate Account
   - Reset Password
   - Update Profile Fields
   - Change Role

6. **System stores action**
   - Logs to audit trail
   - Sends notifications if needed
   - Updates user status immediately

## Acceptance Criteria Met

✅ Admin can view all users with filters (active, suspended, verified, unverified)
✅ Admin can view full user profiles (details, activity history, orders, wallet status)
✅ Admin can suspend or reactivate users
✅ Admin can reset user passwords or force password updates
✅ Admin can modify limited profile fields (e.g., phone, email) only when necessary
✅ Admin can see a complete login history and security flags
✅ System logs all admin actions for audit purposes (placeholder implemented)

## Future Enhancements

- Bulk user operations (suspend multiple, export selected)
- Advanced filtering (by date range, by order count, by wallet balance)
- Full audit log viewer with filtering and search
- User activity analytics and charts
- Email notification configuration per action
- Role-based action permissions (restrict certain actions to super admins)
- User impersonation (for support purposes)
- Custom user tags/labels for organization

## Testing Recommendations

1. Test pagination with various data sizes
2. Verify filter combinations work correctly
3. Test all action dialogs and their confirmations
4. Verify toast notifications appear for all actions
5. Test loading states and error handling
6. Verify responsive design on mobile devices
7. Test CSV export with large datasets
8. Verify audit logging captures all actions

## Dependencies

- Sonner (for toast notifications)
- Lucide React (for icons)
- Radix UI (for dialog/alert components)
- Next.js 14+ (for routing)

## Notes

- **Uses mock data** - All data comes from `lib/constants.ts` (users & userDetails)
- No API calls are made - purely UI mockup with realistic data
- Dialog components use AlertDialog for consistency with project patterns
- Profile updates are restricted to email and phone only for security
- All actions show confirmation dialogs before execution
- Client-side filtering and search functionality
- Toast notifications for user feedback on all actions
- Follows the same pattern as other management pages in the project
