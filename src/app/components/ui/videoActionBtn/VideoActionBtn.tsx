import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import ShareDialog from "../shareDialog/ShareDialog";

const VideoActionBtn = ({ urlLink }: any) => {
  const [toggleLike, settoggleLike] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toogleLikeBtn = () => {
    settoggleLike(!toggleLike);
  };

  const toogleAnimation = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <>
      <Button variant="ghost" className={`relative flex items-center  `}>
        <div className="flex items-center">
          {isAnimating && (
            <div className="absolute inset-0 flex items-center justify-start">
              <Image
                src="/like-animation.gif"
                alt="Animating"
                width={50}
                height={55}
              />
            </div>
          )}
          <span onClick={toogleLikeBtn}>
            <ThumbsUpIcon
              onClick={toogleAnimation}
              className={`relative mb-1 h-5 w-5 transition-opacity duration-500 ${
                toggleLike
                  ? "hidden"
                  : isAnimating
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />
          </span>
          <ThumbsUpIconFilled
            onClick={toogleLikeBtn}
            className={`relative mb-1 h-5 w-5 transition-opacity duration-500 ${
              toggleLike
                ? isAnimating
                  ? "opacity-0"
                  : "opacity-100"
                : "hidden"
            }`}
          />
        </div>
        <div className="ml-1">4.6K</div>
      </Button>

      <div>
        <ShareDialog link={urlLink} />
      </div>
      <Button variant="ghost" className="flex items-center space-x-1">
        <DownloadIcon className="h-5 w-5" />
        <span>Download</span>
      </Button>
    </>
  );
};

export default VideoActionBtn;

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ThumbsUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

const ThumbsUpIconFilled = (props: any) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="style=fill">
      <g id="like">
        <path
          id="Subtract"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.9977 5.63891C16.2695 4.34931 15.433 3.00969 14.2102 2.59462C13.6171 2.37633 12.9892 2.4252 12.4662 2.60499C11.9449 2.78419 11.4461 3.12142 11.1369 3.58441L11.136 3.58573L7.49506 9.00272C8.05104 9.29585 8.43005 9.87954 8.43005 10.5518V21.3018H6.91003V21.3018H16.6801C18.2938 21.3018 19.2028 20.2977 19.8943 19.202C20.6524 18.0009 21.1453 16.7211 21.5116 15.5812C21.6808 15.0546 21.8252 14.5503 21.9547 14.0984L21.9863 13.9881C22.126 13.5007 22.2457 13.0904 22.366 12.7549C22.698 11.8292 22.5933 10.9072 22.067 10.2072C21.5476 9.5166 20.7005 9.15175 19.76 9.15175H15.76C15.6702 9.15175 15.6017 9.11544 15.5599 9.06803C15.5238 9.02716 15.4831 8.95058 15.502 8.81171L15.9977 5.63891Z"
          fill="#ffff"
        />
        <path
          id="rec"
          d="M2.18005 10.6199C2.18005 10.03 2.62777 9.55176 3.18005 9.55176H6.68005C7.23234 9.55176 7.68005 10.03 7.68005 10.6199V21.3018H3.18005C2.62777 21.3018 2.18005 20.8235 2.18005 20.2336V10.6199Z"
          fill="#ffff"
        />
      </g>
    </g>
  </svg>
);
