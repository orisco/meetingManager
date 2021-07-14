import axios from "axios";
import { PostManager, PostMeeting } from "../types/types";
import { dateFormatter } from "../utils/helpers";

export const getMeetingForTheDay = async (body: any) => {
  return await axios
    .post(`http://localhost:7000/api/meetings/date`, {date: dateFormatter(body)})
};

export const getAllManagers = async () => {
  return await axios
    .get(`http://localhost:7000/api/managers/`)
};

export const makeNewMeeting = async (body: PostMeeting) => {
  return await axios
    .post(`http://localhost:7000/api/meetings/add/`, body)
}

export const deleteAMeeting = async (_id: string) => {
  return await axios
    .delete(`http://localhost:7000/api/meetings/delete/${_id}`)
}

export const deleteManager = async (_id: string) => {
  return await axios
    .delete(`http://localhost:7000/api/managers/delete/${_id}`)
}

export const addNewManager = async (body: PostManager) => {
  return await axios
    .post(`http://localhost:7000/api/managers/add`, body)
}