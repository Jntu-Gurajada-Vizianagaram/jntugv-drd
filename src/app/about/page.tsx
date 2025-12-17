import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 space-y-12">
            <section className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-primary">About Directorate of Research & Development</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    The Directorate of Research and Development at JNTUGV is established to promote research activities
                    among faculty and students. We aim to foster an environment of innovation, facilitating collaboration
                    between academia and industry.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card id="vision" className="scroll-mt-24">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Vision</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            To be a leading center for research and innovation, driving technological advancement and
                            societal development through high-quality research outcomes.
                        </p>
                    </CardContent>
                </Card>
                <Card id="mission" className="scroll-mt-24">
                    <CardHeader>
                        <CardTitle className="text-2xl text-primary">Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>Encourage interdisciplinary research and collaboration.</li>
                            <li>Support faculty and scholars in securing research grants.</li>
                            <li>Promote ethical research practices and intellectual property creation.</li>
                            <li>Facilitate the dissemination of knowledge through publications and conferences.</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

            <section className="bg-muted p-8 rounded-xl">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="md:w-1/3">
                        {/* Placeholder for Director Image */}
                        <div className="aspect-[3/4] bg-slate-300 rounded-lg flex items-center justify-center text-slate-500">
                            <img src="https://jntugv.edu.in/static/media/dr&d.06287b589b1153fcddb4.jpg" alt="Director" className="w-full h-full object-cover rounded-lg" />

                        </div>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                        <h2 className="text-3xl font-bold text-primary">Director's Message</h2>
                        <p className="text-muted-foreground text-lg italic">
                            "Research is the backbone of academic excellence. We strive to provide the best infrastructure
                            and support system for our scholars to reach new heights in their respective fields."
                        </p>
                        <div>
                            <h3 className="font-bold text-xl">Dr. G. Swami Naidu</h3>
                            <p className="text-sm text-muted-foreground">Director </p>
                            <p className="text-sm text-muted-foreground">Directorate of Research & Development</p>
                            <p className="text-sm text-muted-foreground">JNTUGV</p>
                            <p className="text-sm text-muted-foreground">Email: dr@jntugv.edu.in</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
