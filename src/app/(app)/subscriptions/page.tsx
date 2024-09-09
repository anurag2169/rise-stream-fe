import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ListBulletIcon } from "@radix-ui/react-icons";

const Subscriptions = () => {
  const subscriptions = [
    { name: "Tech Channel", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Cooking Show", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Travel Vlog", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Music Station", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Gaming Stream", avatar: "/placeholder.svg?height=32&width=32" },
  ];

  const videos = [
    {
      title: "Latest Tech Review lorem ipsum lorem ipsum",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channel: "Tech Channel",
    },
    {
      title: "Easy Pasta Recipe",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channel: "Cooking Show",
    },
    {
      title: "Exploring Tokyo",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channel: "Travel Vlog",
    },
    {
      title: "Top 10 Hits of 2023",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channel: "Music Station",
    },
    {
      title: "Minecraft Speedrun",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channel: "Gaming Stream",
    },
    {
      title: "Smartphone Comparison",
      thumbnail: "/placeholder.svg?height=180&width=320",
      channel: "Tech Channel",
    },
  ];
  return (
    <>
      <div className={`min-h-screen`}>
        <div className="container mx-auto p-4 bg-background text-foreground">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Subscriptions</h1>
            <Button variant="ghost" size="icon">
              <ListBulletIcon className="h-5 w-5" />
            </Button>
          </header>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="continue">Continue watching</TabsTrigger>
              <TabsTrigger value="unwatched">Unwatched</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-12 gap-4">
              <aside className="col-span-12 md:col-span-3 lg:col-span-2">
                <ScrollArea className="h-[300px] md:h-[600px]">
                  {subscriptions.map((sub, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start mb-2"
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={sub.avatar} alt={sub.name} />
                        <AvatarFallback>{sub.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{sub.name}</span>
                    </Button>
                  ))}
                </ScrollArea>
              </aside>

              <TabsContent
                value="all"
                className="col-span-12 md:col-span-9 lg:col-span-10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {videos.map((video, index) => (
                    <Card key={index}>
                      <CardContent className="p-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-auto"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold truncate">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {video.channel}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
