export interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  isPublished: boolean;
  owner: Owner;
  createdAt: string;
  updatedAt: string;
}

export interface Owner {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  createdAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  video: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}


export interface videoAndPlaylistProps {
  id: string;
  title: string;
  description: string;
  fullname: string;
  thumbnail: string;
  avatarUrl: string;
  views: number;
  createdAt: string;
  duration: any;
}