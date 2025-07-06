export interface StudentSubjectModel {
  icon: string;
  title: string;
  teachers: string[];
}

export type Post =
  | ({ type: 'Announcement' } & AnnouncementModel)
  | ({ type: 'Assignment' } & AssignmentModel);

export interface AnnouncementModel {
  title: string;
  body: string;
  member: string;
  timestamp: Date;
  attachments: number;
  comments: number;
}

export interface AssignmentModel {
  title: string;
  member: string;
  timestamp: Date;
  attachments: number;
  comments: number;
}

export interface PostSectionModel {
  posts: Post[];
  name: string;
}

export interface TabModel {
  icon: string;
  title: string;
  href: string;
}
