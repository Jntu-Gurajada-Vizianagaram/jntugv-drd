"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
    return (
        <div className="p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Admin Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">App configuration and admin management (Coming Soon).</p>
                </CardContent>
            </Card>
        </div>
    );
}
