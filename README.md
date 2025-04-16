# Executive Mail

An AI-powered email management system for busy professionals.

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Core functionality
│   ├── constants/   # App constants and config
│   ├── services/    # API and external services
│   ├── types/       # TypeScript definitions
│   └── utils/       # Helper functions
├── pages/           # Page components
└── styles/          # Global styles and themes

```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
VITE_API_BASE_URL=your_api_url
```

3. Start development server:
```bash
npm run dev
```

## Database Schema

### Users
- id: UUID
- email: String
- name: String
- authProvider: String
- createdAt: Timestamp
- updatedAt: Timestamp

### UserSettings
- userId: UUID (FK)
- selectedLabels: JSON
- voiceSettings: JSON
- aiSettings: JSON
- updatedAt: Timestamp

### EmailSummaries
- emailId: String
- userId: UUID (FK)
- summary: Text
- keyPoints: JSON
- createdAt: Timestamp

## Local Storage

- auth_token: JWT token
- email_cache: Cached email data (30min TTL)
- drafts: Draft emails
- user_settings: UI preferences

## API Integration

1. Replace mock data in `src/lib/services/api.service.js`
2. Update API endpoints in `src/lib/constants/app.constants.js`
3. Implement error handling and loading states
4. Add real-time updates using WebSocket

## Authentication

Uses OAuth 2.0 with Google for secure Gmail access. JWT tokens for API authentication.

## Features

- AI email summarization
- Priority inbox
- Thread management
- Voice controls
- Draft system
- Custom AI prompts

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Open pull request

## License

MIT