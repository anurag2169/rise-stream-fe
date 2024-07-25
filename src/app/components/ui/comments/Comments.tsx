"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { commentUrlPath } from "@/app/config/url.const";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";

dayjs.extend(relativeTime);

const Comments = ({ comments, currentUser, onAddComment }: any) => {
  const accessToken = Cookies.get("accessToken");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const formatCreatedAt = (dateString: string): string => {
    return dayjs(dateString).fromNow();
  };

  const toggleEdit = (comment: any) => {
    setEditingCommentId(comment._id);
    setEditedContent(comment.content);
  };

  const handleEditChange = (e: any) => {
    setEditedContent(e.target.value);
  };

  const handleEditSubmit = async (commentId: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${commentUrlPath.updateComment}${commentId}`, {
        method: "POSt",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({ content: editedContent }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const updatedComment = await res.json();
      // Update the comment in the local state
      comments = comments.map((comment: any) =>
        comment._id === commentId ? updatedComment : comment
      );
      setEditingCommentId(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const commentOnVideo = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log("Content before sending:", content);
    try {
      await onAddComment(content);
      setContent("");
      setLoading(false);
    } catch (error) {
      console.error("Failed to add comment:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mt-8 bg-muted p-4 rounded-md dark:bg-muted-dark dark:text-muted-foreground-dark">
        <h2 className="text-lg font-semibold">Comments</h2>
        <div className="mt-4 flex gap-2 items-end">
          <Textarea
            id="content"
            name="content"
            value={content}
            required
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="Add a comment..."
            className="w-full rounded-md border border-muted-foreground/20 p-2 text-sm focus:border-primary focus:outline-none bg-muted dark:bg-muted-dark dark:text-muted-foreground-dark"
          />
          <Button onClick={commentOnVideo} variant={"default"} className="mt-2">
            Comment
          </Button>
        </div>
        <div className="my-4 space-y-4">
          {comments &&
            comments.map((comment: any) => {
              return (
                <div key={comment?._id} className="flex items-start">
                  <Avatar>
                    <AvatarImage
                      src={"https://github.com/shadcn.png"}
                      className="w-10 h-10 rounded-full"
                    />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCreatedAt(comment.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {comment.owner === currentUser?._id && (
                          <>
                            {editingCommentId === comment._id ? (
                              <>
                                <Button
                                  onClick={() => setEditingCommentId(null)}
                                  variant="ghost"
                                  size="icon"
                                >
                                  <span>Cancel</span>
                                </Button>
                                <Button
                                  onClick={() => handleEditSubmit(comment._id)}
                                  variant="default"
                                  size="icon"
                                >
                                  <span>OK</span>
                                </Button>
                              </>
                            ) : (
                              <Button
                                onClick={() => toggleEdit(comment)}
                                variant="ghost"
                                size="icon"
                              >
                                <FilePenIcon className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            )}
                            <Button variant="ghost" size="icon">
                              <TrashIcon className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon">
                          <ThumbsUpIcon className="h-4 w-4" />
                          <span className="sr-only">Like</span>
                        </Button>
                      </div>
                    </div>
                    {editingCommentId === comment._id ? (
                      <Input
                        id="editedContent"
                        name="editedContent"
                        value={editedContent}
                        required
                        onChange={handleEditChange}
                        placeholder="Update a comment"
                        className="w-full rounded-md border border-muted-foreground/20 text-sm focus:border-primary focus:outline-none bg-muted dark:bg-muted-dark dark:text-muted-foreground-dark"
                      />
                    ) : (
                      <p className="mt-2 text-sm">{comment.content}</p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Comments;

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

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function FilePenIcon(props: any) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}
