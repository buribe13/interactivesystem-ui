# Media Content Ecosystem Simulation

An interactive Next.js + p5.js simulation of a media content ecosystem. This project models how articles, authors, categories, tags, and readers interact, with emergent behaviors like trending topics and viral spread.

## Features

- **Object-Oriented Architecture**: Clean OOP design with classes for Ecosystem, Article, Author, Category, Tag, and Reader
- **Real-time Visualization**: p5.js canvas showing dynamic relationships and interactions
- **Emergent Behaviors**: 
  - Trending algorithm based on engagement, time decay, and author influence
  - Viral spread mechanism
  - Author influence feedback loops
  - Reader recommendation system
- **Interactive Controls**: Publish articles, adjust simulation speed, view statistics
- **Documentation**: Comprehensive documentation page with UML diagrams and flowcharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main simulation page
│   ├── documentation/      # Documentation page
│   └── globals.css         # Global styles
├── components/
│   ├── P5Canvas.tsx        # p5.js canvas wrapper
│   ├── Controls.tsx        # Control panel component
│   └── ui/                 # UI components (Button, Card, etc.)
├── lib/
│   ├── ecosystem/          # OOP core classes
│   │   ├── Ecosystem.ts
│   │   ├── Article.ts
│   │   ├── Author.ts
│   │   ├── Category.ts
│   │   ├── Tag.ts
│   │   └── Reader.ts
│   ├── initEcosystem.ts    # Initialization logic
│   └── p5-sketch.ts        # p5.js visualization
└── package.json
```

## How to Use

### Visualization

- **Articles**: Shown as circles (size = trending score, color = engagement level)
- **Categories**: Colored regions grouping articles
- **Authors**: Purple nodes in a circle, connected to their articles
- **Connections**: Lines showing relationships
- **Hover**: Hover over articles to see tooltips
- **Click**: Click articles to see detailed information

### Controls

- **Publish Article**: Fill in title, author, category, and tags to add new content
- **Random Article**: Generate a random article with random properties
- **Speed Slider**: Adjust simulation speed (0.5x to 3x)
- **Reset**: Reset the entire ecosystem to initial state
- **Statistics**: View real-time stats including views, likes, shares, and trending count

## Technical Stack

- **Next.js 14**: App Router, React Server Components
- **TypeScript**: Type safety
- **p5.js**: Canvas-based visualization
- **React-p5**: React integration for p5
- **Tailwind CSS**: Styling
- **Object-Oriented Programming**: Core architecture

## Assignment Requirements

✅ **UML Diagram**: Included in documentation page  
✅ **Flowchart**: Included in documentation page  
✅ **OOP Implementation**: All entities are classes with relationships  
✅ **Visual Representation**: p5.js canvas with interactive graphics  
✅ **User Input**: Direct control (publish articles) and indirect control (speed adjustment)  
✅ **Emerging Properties**: Trending algorithm, viral spread, influence loops  
✅ **Webpage**: Documentation page with diagrams and embedded sketch  

## License

This project is created for educational purposes.

