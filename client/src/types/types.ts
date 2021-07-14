export interface Meeting {
  _id: string;
  date: Date;
  startTime: number;
  endTime: number;
  color: string;
  manager: Manager;
}

export interface PostManager {
  firstName: string;
  lastName: string;
}

export interface Manager extends PostManager {
  _id: string;
}

export interface PostMeeting {
  date: Object;
  startTime: number;
  endTime: number;
  manager: string;
}

export interface Error {
  isError: boolean;
  message?: string;
}

export interface ErrorType {
  error: Error;
  setError: React.Dispatch<React.SetStateAction<Error>>;
}
