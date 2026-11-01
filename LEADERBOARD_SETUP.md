# Optional shared leaderboard — Jemma's Math Arcade

The game **already works without a backend**: visitors enter a nickname, unlock 15 puzzles, keep their progress on their own device, and can save personal scores. Those scores are **not shared between visitors**.

To display a **global leaderboard** on GitHub Pages:

1. Create a Supabase project at https://supabase.com/.
2. Open its **SQL Editor** and run [docs/leaderboard.sql](./docs/leaderboard.sql). Review the SQL before running it.
3. Obtain your project's **URL** and **publishable API key** (`sb_publishable_...`) from its Connect dialog.
4. Edit [docs/leaderboard-config.js](./docs/leaderboard-config.js) and fill in the URL and publishable key.
5. Commit the changes and let GitHub Pages redeploy. The leaderboard automatically switches to public rankings and saves new scores after a visitor chooses **Save my score**.

**Security / fairness:** A publishable key is intended to appear in browser code, provided database Row Level Security is enabled. **Never commit a Supabase secret or service-role key.** This example enables anonymous public score submissions with limits on name/score fields. They are not verified and could be spoofed or spammed. For a trusted competitive leaderboard, use authenticated players and an authoritative backend that validates completions, plus rate limiting and abuse prevention. Public nicknames and scores are visible to everyone after submission. Users should choose a nickname, not an email address or legal name.

References:
- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/database/secure-data
- https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
