"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (res.ok) {
                setStatus("success");
                setName("");
                setEmail("");
                setSubject("");
                setMessage("");
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            setStatus("error");
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-4 text-primary">Contact Us</h1>
                <p className="text-muted-foreground">
                    Have questions regarding Ph.D. admissions, research guidelines, or other queries?
                    Reach out to us using the form below or via our direct contact channels.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground leading-relaxed">
                            Directorate of Research & Development<br />
                            Jawaharlal Nehru Technological University Gurajada Vizianagaram<br />
                            Dwarapudi, Vizianagaram<br />
                            Andhra Pradesh - 535003
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary" /> Email
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <a href="mailto:dr@jntugv.edu.in" className="text-primary hover:underline">dr@jntugv.edu.in</a>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary" /> Phone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            +91 81920 32112 (Office Hours: 10 AM - 5 PM)
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle className="text-2xl">Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {status === "success" && (
                                <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                                    Message sent successfully! We will get back to you soon.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                                    Failed to send message. Please try again later.
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
                                    placeholder="Inquiry regarding..."
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea
                                    className="w-full rounded-md border border-input px-3 py-2 text-sm min-h-[150px] bg-background"
                                    placeholder="How can we help you?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full md:w-auto" disabled={status === "loading"}>
                                {status === "loading" ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
