import { AxiosResponse } from 'axios';
import moment from 'moment'
import { Error, Meeting } from '../types/types';

export const workingHours = [9,10,11,12,13,14,15,16,17,18]

export const dateFormatter = (date: Date) => {
  const formatDate =  moment(date).format('YYYY-MM-DD[T00:00:00.000Z]');
  return formatDate;
}

export const dayFormatter = (date: Object) => {
  const dayFormat = moment(date).format('YYYY-MM-DD')
  return dayFormat;
}

export async function occupancyIdentifier(meetings: Meeting[], hour: number) {
  const objectName = await meetings.find((meeting) => {
  const meetingTime = meeting.endTime - meeting.startTime
  return hour >= meeting.startTime && hour <= meeting.startTime + meetingTime
})
return objectName
}

export async function availableHours(meetings: Meeting[], hour: number) {
  const meeting = await meetings.find((meeting) => hour <= meeting.startTime)
  if (meeting) {
    return (workingHours.slice(workingHours.indexOf(hour), workingHours.indexOf(meeting.startTime)))
  } 
  return (workingHours.slice(workingHours.indexOf(hour), 10))  
}

export const responseHandler = (someFunction: Promise<AxiosResponse<any>>, setState: React.Dispatch<React.SetStateAction<any>>, setError: React.Dispatch<React.SetStateAction<Error>>) => {
  Promise.resolve(someFunction).then((res: AxiosResponse<any>) => {
    Array.isArray(res.data) ?  setState(res.data) : setState(res.data._id)
  }).catch((err) => {
    setError({isError: true,
    message: err.message})
  })
}