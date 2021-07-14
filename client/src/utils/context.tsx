import {createContext} from 'react'
import { Manager, ErrorType } from '../types/types';


type Context = {
  date: Object;
  setDate: React.Dispatch<React.SetStateAction<Object>>
  updateId: string
  setUpdateId: React.Dispatch<React.SetStateAction<string>>
  managers: Manager[]
  setManagers: React.Dispatch<React.SetStateAction<Manager[]>>
}

export const DataContext = createContext<Context>({date: {}, setDate: () => {}, updateId: "", setUpdateId: () => "", managers: [], setManagers: () => []});

export const ErrorContext = createContext<ErrorType>({error: {isError: false, message: ""}, setError: () => {}})