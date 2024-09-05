import { Button } from "@/components/ui/button";
import React from "react";

const AccountDetails = () => {
  return (
    <>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Account</h2>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            Choose how you appear and what you see on YouTube
          </h3>
          <p>Signed in as anuragd2169@gmail.com</p>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Your YouTube channel</h4>
            <p>
              This is your public presence on YouTube. You need a channel to
              upload your own videos, comment on videos or create playlists.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-400 rounded-full" />
              <div>
                <p className="font-semibold">Anurag Dubey #dubeyji</p>
                <Button variant="link" className="p-0 h-auto font-normal">
                  Channel status and features
                </Button>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto">
              Add or manage your channel(s)
            </Button>
            <Button variant="link" className="p-0 h-auto">
              View advanced settings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
