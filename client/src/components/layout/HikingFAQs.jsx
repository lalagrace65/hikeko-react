import SectionHeaders from "./SectionHeaders"
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function HikingFAQs() {
  return (
    <div>
        <div className="text-center mb-4">
        <SectionHeaders
          subHeader={''}
          mainHeader={'Hiking FAQs'}  />
        </div>

        {/* Accordion */}
        <div>
            <div className='mt-10 flex flex-col items-center'>
            <h2 className="text-2xl font-bold mb-4 text-center">General Hiking Questions</h2>
                <Accordion type="single" collapsible className="max-w-2xl w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-center bg-slate-300 mb-2">What is hiking? </AccordionTrigger>
                    <AccordionContent className="text-justify">
                        Hiking is a form of walking, usually on trails, often in natural areas. 
                        It's a popular outdoor activity that offers many benefits for physical and mental health.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-center bg-slate-300 mb-2">What equipment do I need for hiking? </AccordionTrigger>
                    <AccordionContent className="text-justify">
                    Basic hiking essentials include comfortable hiking boots, 
                    appropriate clothing, a backpack, water, snacks, a map, 
                    and a compass. Depending on the hike, you may also need 
                    additional items like trekking poles, a first-aid kit, 
                    and rain gear.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-center bg-slate-300 mb-2">How do I choose a hiking trail?</AccordionTrigger>
                    <AccordionContent className="text-justify">
                    Consider your fitness level, experience, and 
                    the amount of time you have available. 
                    Research different trails to find one that 
                    matches your interests and abilities. 
                    Look for information on trail length, elevation gain, 
                    difficulty level, and scenic features.
                    </AccordionContent>
                </AccordionItem>
                </Accordion>
            </div>
        </div>

       {/* Skill Levels Explained */}
       <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4 text-center">Skill Levels Explained – Day Hike</h2>
                <table className="min-w-full bg-gray-200">
                    <thead>
                        <tr className="bg-gray-300 text-left">
                            <th className="py-2 px-4">Image</th>
                            <th className="py-2 px-4">Classification</th>
                            <th className="py-2 px-4">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Beginner Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/beginner.png" alt="Beginner" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">Beginner</td>
                            <td className="py-2 px-4">
                                These hiking destinations are great entry points for first-time hikers and training climbs for beginners. 
                                Going on day hikes through these trails are good opportunities to totally immerse yourself in nature and explore mountain hiking in the Philippines at a leisurely pace.
                            </td>
                        </tr>

                        {/* Intermediate Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/intermediate.png" alt="Intermediate" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">Intermediate</td>
                            <td className="py-2 px-4">
                                If you’re an experienced hiker looking for a quick but challenging hike, these 5/9 day hikes are for you. 
                                Similarly, if you’re a beginner, not a first-timer, looking for a practice climb for an upcoming major hike, 
                                these moderately difficult day hikes should help you get into shape.
                            </td>
                        </tr>

                        {/* Advanced Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/advanced.png" alt="Advanced" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">Advanced</td>
                            <td className="py-2 px-4">
                                If you’re an advanced hiker looking for the next challenging summit to conquer, 
                                these Philippine mountains belong on your hiking bucket list. 
                                These mountains have earned a certain level of fear even among the most veteran hikers. 
                                These mountains test the toughest of climbers even after intense physical training and mental preparation.
                            </td>
                        </tr>

                        {/* + Rating Row */}
                        <tr className="border-b">
                            <td className="py-2 px-4 text-center">
                                <img src="/plus-rating.png" alt="+ Rating" width={100} height={100} className="rounded-lg" />
                            </td>
                            <td className="py-2 px-4">+ Rating</td>
                            <td className="py-2 px-4">
                                The ‘+’ symbol next to a difficulty rating signifies an added degree of difficulty. 
                                The factors that necessitate this additional rating vary from hike to hike but generally include: 
                                slightly longer hiking distances, greater elevation change, and short sections of trail that present more challenging conditions than the majority of the rest of the trip.
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>

        {/* Trail Difficulty and Classification */}
        <div>
        <h2 className="text-2xl font-bold mb-4 text-center">Trail Difficulty and Classification</h2>
        {/* Three Cards in a Row */}
            <div className="flex justify-center mt-10 space-x-8"> 
                <Card className="bg-gray-300 max-w-xs">
                <CardHeader>
                    <CardTitle>Card 1</CardTitle>
                    <CardDescription>Description 1</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                    <img src="/image3.png" 
                        alt="trail" 
                        width={200} height={200}
                        className="rounded-lg items-center"  />
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </CardContent>
                <CardFooter>
                    <p>Footer 1</p>
                </CardFooter>
                </Card>

                <Card className="bg-gray-300 max-w-xs">
                <CardHeader>
                    <CardTitle>Card 2</CardTitle>
                    <CardDescription>Description 2</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </CardContent>
                <CardFooter>
                    <p>Footer 2</p>
                </CardFooter>
                </Card>

                <Card className="bg-gray-300 max-w-xs">
                <CardHeader>
                    <CardTitle>Card 3</CardTitle>
                    <CardDescription>Description 3</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </CardContent>
                <CardFooter>
                    <p>Footer 3</p>
                </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
}
