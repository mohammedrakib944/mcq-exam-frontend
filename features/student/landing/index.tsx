"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function StudentLandingFeature() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-xl">এমসিকিউ (MCQ) প্ল্যাটফর্ম</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            শিক্ষার্থীর জন্য কোনো নির্দিষ্ট ড্যাশবোর্ড নেই। পরীক্ষায় অংশগ্রহণ করতে অনুগ্রহ করে আপনার শিক্ষকের দেওয়া লিঙ্কটি ব্যবহার করুন।
          </p>
          <Button onClick={() => router.push("/")} variant="outline" className="w-full">
            হোমে ফিরে যান
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
