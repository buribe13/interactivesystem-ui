import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button asChild variant="outline">
          <Link href="/">
            ← Back to Simulation
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">Media Content Ecosystem Simulation</CardTitle>
            <CardDescription>
              An interactive simulation of a media content ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Project Intent</h2>
              <p className="text-muted-foreground mb-4">
                This project models a media content ecosystem where articles, authors, categories, tags, and readers
                interact with each other. The system demonstrates emergent behaviors such as trending topics, viral spread,
                and author influence loops that arise from simple interaction rules.
              </p>
              <p className="text-muted-foreground">
                The goal is to visualize how complex patterns can emerge from simple object-oriented relationships and
                interaction rules, similar to how real-world media platforms work.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Process & Development</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">1. System Design:</strong> Started by identifying the core entities (Article, Author, Category,
                  Tag, Reader) and their relationships. Designed the ecosystem as a central controller managing all
                  interactions.
                </p>
                <p>
                  <strong className="text-foreground">2. OOP Implementation:</strong> Created classes with clear responsibilities. Each class has
                  properties and methods that define how it interacts with other entities.
                </p>
                <p>
                  <strong className="text-foreground">3. Emerging Properties:</strong> Implemented algorithms that create emergent behaviors:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Trending algorithm that combines engagement, time decay, and author influence</li>
                  <li>Viral spread mechanism that boosts related articles when content is shared</li>
                  <li>Author influence feedback loop</li>
                  <li>Reader recommendation system based on interests</li>
                </ul>
                <p>
                  <strong className="text-foreground">4. Visualization:</strong> Built a p5.js sketch that visually represents the ecosystem with
                  category regions, article nodes, author positions, and dynamic connections.
                </p>
                <p>
                  <strong className="text-foreground">5. User Interaction:</strong> Added controls for publishing articles, adjusting simulation
                  speed, and viewing real-time statistics.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">UML Class Diagram</h2>
              <Card>
                <CardContent className="p-6">
                  <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap overflow-x-auto">
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
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">System Flowchart</h2>
              <Card>
                <CardContent className="p-6">
                  <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap overflow-x-auto">
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
                </CardContent>
              </Card>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Emerging Properties</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">1. Trending Algorithm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Articles automatically become trending based on a weighted formula: (engagement × timeDecay ×
                      authorBoost). No explicit trending list is maintained—it emerges from the calculations.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">2. Viral Spread</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      When an article is shared, related articles (same category or tags) receive view boosts. This creates
                      cascading effects through the network.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">3. Author Influence Loop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Popular articles increase author influence, which then boosts new articles from that author. This
                      creates a positive feedback loop.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">4. Recommendation System</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Readers develop interests from liked articles, and the system suggests matching content. This
                      personalization emerges from behavior patterns.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">5. Category Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Categories with multiple trending articles become "hot" categories, creating emergent category-level
                      patterns.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Technical Stack</h2>
              <div className="flex flex-wrap gap-2">
                <Badge>Next.js 14</Badge>
                <Badge>TypeScript</Badge>
                <Badge>p5.js</Badge>
                <Badge>React-p5</Badge>
                <Badge>Tailwind CSS</Badge>
                <Badge>shadcn/ui</Badge>
                <Badge>OOP</Badge>
              </div>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-4">
                <li>Next.js 14 (App Router, React Server Components)</li>
                <li>TypeScript (Type safety)</li>
                <li>p5.js (Canvas-based visualization)</li>
                <li>React-p5 (React integration for p5)</li>
                <li>Tailwind CSS (Styling)</li>
                <li>shadcn/ui (UI Components)</li>
                <li>Object-Oriented Programming (Core architecture)</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
              <Tabs defaultValue="visualization" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="visualization">Visualization</TabsTrigger>
                  <TabsTrigger value="publishing">Publishing</TabsTrigger>
                  <TabsTrigger value="speed">Speed</TabsTrigger>
                  <TabsTrigger value="stats">Statistics</TabsTrigger>
                </TabsList>
                <TabsContent value="visualization" className="space-y-2">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">
                        The canvas shows articles as circles (size = trending score, color =
                        engagement level), grouped by category regions. Authors are shown as purple nodes in a circle. Click on
                        articles to see details, hover for tooltips.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="publishing" className="space-y-2">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">
                        Use the controls panel to publish new articles. Fill in title, author,
                        category, and tags. Click "Random" to generate a random article.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="speed" className="space-y-2">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">
                        Adjust the speed slider to control how fast the simulation runs (0.5x
                        to 3x).
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="stats" className="space-y-2">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">
                        View real-time statistics including total views, likes, shares, and
                        trending count.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

