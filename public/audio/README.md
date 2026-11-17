# Arabic Wedding Nasheed Audio Asset

Place your properly licensed, vocals-only Islamic wedding nasheed file in this directory using one of the following filenames:

- `wedding-nasheed.mp3` (recommended universal format)
- `wedding-nasheed.aac` (AAC stream supported in modern browsers)
- `wedding-nasheed.ogg` (optional fallback format)

Path referenced by `frontend/src/config/weddingConfig.ts`:
- `/audio/wedding-nasheed.aac`
- `/audio/wedding-nasheed.mp3`
- `/audio/wedding-nasheed.ogg`

If no file is placed here yet, the audio player gracefully renders an honest "Track pending" status without simulating playback or failing.

