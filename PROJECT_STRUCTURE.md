# WaveWatch Project Structure

## 📁 React Frontend (`src/wavewatch/ui/client/src/`)

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   ├── LoadingSpinner.js
│   │   └── ErrorMessage.js
│   ├── layout/              # Layout components
│   │   └── Header.js
│   └── features/            # Feature-specific components
│       └── surf/
│           └── WaveHeightChart.js
├── pages/                   # Page components
│   ├── HomePage.js
│   ├── SurfPage.js
│   ├── LoginPage.js
│   └── RegisterPage.js
├── styles/                  # Design system
│   ├── theme.js            # Colors, spacing, breakpoints
│   └── mixins.js           # Reusable styled-component patterns
├── services/                # API services
│   └── surfApi.js
├── App.js                   # Main app with routing
└── index.js                 # React entry point
```

## 🐍 Python Backend (`src/wavewatch/`)

```
src/wavewatch/
├── api/                     # Data fetching
│   └── data_fetcher.py     # Stormglass & NOAA API calls
├── llm/                     # AI analysis
│   ├── summarizer.py       # Gemini AI surf analysis
│   └── prompt_templates.py
└── core/                    # Core utilities (placeholder)
```

## 🚀 Entry Points (Root)

- `surf_api.py` - FastAPI server (port 8001)
- `streamlit_app.py` - Streamlit UI
- `start_api.sh` - Start FastAPI script

## 🗄️ Node.js Cache Server (`src/wavewatch/ui/server/`)

```
server/
├── server.js               # Express server (port 5001)
└── models/
    └── SurfData.js         # MongoDB schema
```

## 🔄 Data Flow

```
React Frontend (3000)
    ↓
FastAPI Backend (8001)
    ↓
MongoDB Cache (5001)
    ↓
External APIs (Stormglass, NOAA, Gemini)
```

## 📦 Key Folders

- **`components/common/`** - Use in 2+ places
- **`components/layout/`** - Page structure
- **`components/features/`** - Domain-specific
- **`styles/`** - Single source of truth for design
- **`pages/`** - Composition layer (assemble components)

