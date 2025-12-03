import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
        >
          ← Back to Simulation
        </Link>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-6 text-white">Media Content Ecosystem Simulation</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Project Intent</h2>
            <p className="text-gray-300 mb-4">
              This project models a media content ecosystem where articles, authors, categories, tags, and readers
              interact with each other. The system demonstrates emergent behaviors such as trending topics, viral spread,
              and author influence loops that arise from simple interaction rules.
            </p>
            <p className="text-gray-300">
              The goal is to visualize how complex patterns can emerge from simple object-oriented relationships and
              interaction rules, similar to how real-world media platforms work.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Process & Development</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong>1. System Design:</strong> Started by identifying the core entities (Article, Author, Category,
                Tag, Reader) and their relationships. Designed the ecosystem as a central controller managing all
                interactions.
              </p>
              <p>
                <strong>2. OOP Implementation:</strong> Created classes with clear responsibilities. Each class has
                properties and methods that define how it interacts with other entities.
              </p>
              <p>
                <strong>3. Emerging Properties:</strong> Implemented algorithms that create emergent behaviors:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Trending algorithm that combines engagement, time decay, and author influence</li>
                <li>Viral spread mechanism that boosts related articles when content is shared</li>
                <li>Author influence feedback loop</li>
                <li>Reader recommendation system based on interests</li>
              </ul>
              <p>
                <strong>4. Visualization:</strong> Built a p5.js sketch that visually represents the ecosystem with
                category regions, article nodes, author positions, and dynamic connections.
              </p>
              <p>
                <strong>5. User Interaction:</strong> Added controls for publishing articles, adjusting simulation
                speed, and viewing real-time statistics.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">UML Class Diagram</h2>
            <div className="bg-gray-800 p-6 rounded-lg mb-4">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
{`┌─────────────────────────────────────────────────────────────┐
│                         Ecosystem                              │
├─────────────────────────────────────────────────────────────┤
│ - articles: Article[]                                        │
│ - authors: Author[]                                          │
│ - categories: Category[]                                     │
│ - tags: Tag[]                                               │
│ - readers: Reader[]                                          │
│ - updateSpeed: number                                        │
├─────────────────────────────────────────────────────────────┤
│ + addArticle()                                               │
│ + updateTrending()                                           │
│ + simulateInteractions()                                     │
│ + applyViralSpread()                                         │
│ + tick()                                                     │
│ + setUpdateSpeed()                                           │
│ + reset()                                                    │
│ + getStats()                                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ manages
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   Article     │    │    Author     │    │   Category    │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ - id          │    │ - id          │    │ - id          │
│ - title       │    │ - name        │    │ - name        │
│ - author      │───▶│ - articles[]  │    │ - articles[]  │
│ - category    │───▶│ - followers   │    │ - trending[]  │
│ - tags[]      │    │ - influence   │    │               │
│ - views       │    │               │    │               │
│ - likes       │    │               │    │               │
│ - shares      │    │               │    │               │
│ - trending    │    │               │    │               │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ + calculate   │    │ + publish()   │    │ + getTrending()│
│   Trending()  │    │ + calculate   │    │ + calculate   │
│ + getRelated()│    │   Influence() │    │   Trend()     │
│ + addView()   │    │               │    │               │
│ + addLike()   │    │               │    │               │
│ + addShare()  │    │               │    │               │
└───────────────┘    └───────────────┘    └───────────────┘
        │
        │ tagged with
        │
        ▼
┌───────────────┐
│     Tag       │
├───────────────┤
│ - id          │
│ - name        │
│ - articles[]  │
├───────────────┤
│ + addArticle()│
│ + getRelated()│
└───────────────┘

┌───────────────┐
│    Reader     │
├───────────────┤
│ - id          │
│ - name        │
│ - viewed[]     │
│ - liked[]     │
│ - interests[] │
├───────────────┤
│ + viewArticle()│
│ + likeArticle()│
│ + shareArticle()│
│ + getRecommendations()│
└───────────────┘`}
              </pre>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">System Flowchart</h2>
            <div className="bg-gray-800 p-6 rounded-lg mb-4">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
{`                    START
                      │
                      ▼
            ┌─────────────────────┐
            │ Initialize Ecosystem│
            │ - Create Authors    │
            │ - Create Categories │
            │ - Create Tags       │
            │ - Create Readers    │
            │ - Create Articles   │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │   Start Simulation  │
            └──────────┬──────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │   Main Loop (tick)  │
            └──────────┬──────────┘
                       │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Simulate      │ │ Update        │ │ Update        │
│ Interactions  │ │ Trending      │ │ Visualization │
│               │ │ Scores        │ │               │
│ - Random      │ │               │ │ - Articles    │
│   readers     │ │ - Engagement  │ │ - Authors     │
│   interact    │ │ - Time decay  │ │ - Connections │
│ - 70% view    │ │ - Author boost│ │ - Stats       │
│ - 20% like    │ │               │ │               │
│ - 10% share   │ │               │ │               │
└───────┬───────┘ └───────┬───────┘ └───────┬───────┘
        │                 │                 │
        └─────────┬───────┴─────────┬───────┘
                  │                 │
                  ▼                 ▼
        ┌─────────────────┐ ┌──────────────┐
        │ Viral Spread?   │ │ User Input?  │
        │ (if shared)     │ │              │
        └────────┬────────┘ └──────┬───────┘
                 │                 │
                 ▼                 ▼
        ┌─────────────────┐ ┌──────────────┐
        │ Boost Related   │ │ Publish New  │
        │ Articles        │ │ Article      │
        └────────┬────────┘ └──────┬───────┘
                 │                 │
                 └─────────┬───────┘
                           │
                           ▼
                  ┌────────────────┐
                  │  Continue Loop │
                  └────────┬───────┘
                           │
                           ▼
                      (Loop continues)`}
              </pre>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Emerging Properties</h2>
            <div className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">1. Trending Algorithm</h3>
                <p>
                  Articles automatically become trending based on a weighted formula: (engagement × timeDecay ×
                  authorBoost). No explicit trending list is maintained—it emerges from the calculations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">2. Viral Spread</h3>
                <p>
                  When an article is shared, related articles (same category or tags) receive view boosts. This creates
                  cascading effects through the network.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">3. Author Influence Loop</h3>
                <p>
                  Popular articles increase author influence, which then boosts new articles from that author. This
                  creates a positive feedback loop.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">4. Recommendation System</h3>
                <p>
                  Readers develop interests from liked articles, and the system suggests matching content. This
                  personalization emerges from behavior patterns.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">5. Category Trends</h3>
                <p>
                  Categories with multiple trending articles become "hot" categories, creating emergent category-level
                  patterns.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Technical Stack</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Next.js 14 (App Router, React Server Components)</li>
              <li>TypeScript (Type safety)</li>
              <li>p5.js (Canvas-based visualization)</li>
              <li>React-p5 (React integration for p5)</li>
              <li>Tailwind CSS (Styling)</li>
              <li>Object-Oriented Programming (Core architecture)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">How to Use</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong>Visualization:</strong> The canvas shows articles as circles (size = trending score, color =
                engagement level), grouped by category regions. Authors are shown as purple nodes in a circle. Click on
                articles to see details, hover for tooltips.
              </p>
              <p>
                <strong>Publishing:</strong> Use the controls panel to publish new articles. Fill in title, author,
                category, and tags. Click "Random" to generate a random article.
              </p>
              <p>
                <strong>Simulation Speed:</strong> Adjust the speed slider to control how fast the simulation runs (0.5x
                to 3x).
              </p>
              <p>
                <strong>Statistics:</strong> View real-time statistics including total views, likes, shares, and
                trending count.
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}

