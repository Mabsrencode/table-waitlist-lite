# Table Waitlist Lite

## Tech Stack & Choices

- **Next.js 14 (App Router)**.
- **MongoDB**: NoSQL database for flexible data modeling of guest information.
- **React Hook Form**: For efficient form handling with Zod validation.
- **SWR**: Client-side data fetching with caching and revalidation.
- **Custom Debouncing**: Implemented without libraries for better control.
- **React Hot Toast**: For user-friendly notifications.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Mabsrencode/table-waitlist-lite.git
   cd table-waitlist-lite
   ```
2. Create a .env.development file:

```bash
value: MONGODB_URI=mongodb+srv://renielmababa21:UK0SH0st67vtYCIJ@cluster0.clmtikl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

3. Run to the terminal
   ```bash
   npm run dev
   ```

### Wait Time Calculation Formula

```javascript
quotedWaitMin = (positionInQueue * 15) * (isPriority ? 0.75 : 1)
- 15 minutes per party ahead
- 5% reduction for priority guests (0.75 multiplier)
```

### Grace Period System

- 2-minute timer when guest is called
- Visual countdown display (MM:SS format)
- Custom toast notification with "Seat Now" button when the called time period is done it will show a toast to notife the user.
- Automatic reversion to WAITING status after 10 seconds if no action
- Optimistic UI updates for immediate feedback

### Trade-offs & Design Decisions

- Simplified Wait Time Formula
- Kept priority reduction for VIP treatment
- Based purely on queue position for predictability
- Grace Period Logic
- Toast notifications prevent missed guests
- Automatic reversion maintains queue accuracy
- Optimistic updates before server confirmation
- Debounced search to reduce API calls

### With More Time I Would Add:

- Real-time updates with WebSockets
- Table management system
- Staff authentication and roles
- Advanced analytics dashboard
- Historical data analysis for better wait time predictions

### Vercel Link

[https://table-waitlist-lite-eosin.vercel.app/](https://table-waitlist-lite-eosin.vercel.app/)
