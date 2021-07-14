import { useContext, useState } from 'react'

import { Box, Typography } from "@material-ui/core";
import {InputLabel, MenuItem, FormControl, Select, Accordion, AccordionSummary, AccordionDetails, TextField, IconButton} from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import { PostManager } from '../types/types';
import { responseHandler } from '../utils/helpers';
import { addNewManager, deleteManager } from '../services/httpService';
import { DataContext, ErrorContext } from '../utils/context';

const EditManagers = () => {
  const [selectedManager, setSelectedManager] = useState<string>('')
  const [newManager, setNewManager] = useState<PostManager>({
    firstName: "",
    lastName: ""
  })
  const {managers, setUpdateId} = useContext(DataContext)
  const {setError} = useContext(ErrorContext)

  const deleteAManager = () => {
    if (selectedManager) {
      responseHandler(deleteManager(selectedManager), setUpdateId, setError)
      setSelectedManager("")
    } else { 
      setError({isError: true, message: "Please select a manager"}) }
  }
  const addAManager = () => {
    if (newManager.firstName !== "" && newManager.lastName !== ""){
     responseHandler(addNewManager(newManager), setUpdateId, setError)
    } else {
      setError({isError: true, message: "Please fill all the fields"})
    }
  }

  const handleChange = (e: any) => {
  const { name, value } = e.target;
  setNewManager(newManager => ({
      ...newManager,
      [name]: value
  }));
  };

  return (
    <Box>
      <Accordion className="accordion" defaultExpanded>
          <AccordionSummary className="accordion-close" expandIcon={<ExpandMoreIcon />}>
            <Typography>Edit Managers</Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion-open">
              <form>
                <Typography>Delete manager: </Typography>
                <FormControl className="input">
                  <InputLabel>Manager</InputLabel>
                  <Select defaultValue="" value={selectedManager} onChange={(e: any) => setSelectedManager(e.target.value)}>
                    {managers.map((manager, i) => 
                      <MenuItem key={i} value={manager._id}>{`${manager.firstName} ${manager.lastName}`}
                      </MenuItem>
                    )}
                  </Select>  
                </FormControl>
                  <IconButton onClick={() => deleteAManager()}><PersonAddDisabledIcon/></IconButton>
              </form>
              <form>
                  <Typography>Add a new manager: </Typography>
                  <TextField className="input" label="First Name" onChange={handleChange} name="firstName" required />
                  <TextField className="input" label="Last Name" onChange={handleChange} name="lastName" required/>
                  <IconButton type="reset" onClick={() => addAManager()}><PersonAddIcon/></IconButton>
              </form>
          </AccordionDetails>
      </Accordion>
    </Box>
    

  )
}

export default EditManagers;