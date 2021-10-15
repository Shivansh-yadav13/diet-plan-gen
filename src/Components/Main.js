import React, { useState, useEffect } from 'react'
import './CSS/Main.css'
import planList from '../data/diet_plan.json'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { Chip } from '@mui/material'

function Input() {
    const [userWeight, setUserWeight] = useState('')
    const [userHeight, setUserHeight] = useState('')
    const [userBMI, setUserBMI] = useState('')
    const [listIndex, setListIndex] = useState()


    const handleOnSubmit = () => {
        document.getElementById('user-diet-plan').style.display = 'unset'
        document.getElementById('user-data-container').style.display = 'none'
        if (userHeight !== '' && userWeight !== '') {
            if (userBMI < 18.5) {
                setListIndex(1)
            } else if (userBMI >= 18.5 && userBMI < 25) {
                setListIndex(2)
            } else {
                setListIndex(0)
            }
        }
    }

    useEffect(() => {
        setUserBMI(userWeight / (userHeight * userHeight))
    }, [userWeight, userHeight])
    return (
        <>
            <Box id="user-data-container" sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
                <h1>Find Your Diet Plan</h1>
                <TextField
                    type='number'
                    value={userWeight}
                    label="Weight"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    onChange={(e) => { setUserWeight(e.target.value) }}
                />
                <TextField
                    type='number'
                    value={userHeight}
                    label="Height"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">m</InputAdornment>,
                    }}
                    onChange={(e) => setUserHeight(e.target.value)}
                />
                <TextField
                    sx={{ width: '10em' }}
                    disabled
                    id="standard-disabled"
                    label="BMI"
                    value={userBMI ? userBMI : "BMI"}
                    variant="standard"
                />
                <Button sx={{ width: '2em' }} onClick={handleOnSubmit} variant="text">Submit</Button>
            </Box>
            <div id="user-diet-plan" style={{ display: 'none', width: 'fit-content' }}>
                <h1>This is your Diet Plan </h1>
                <h3>{planList[listIndex] ? planList[listIndex].type : ""}-Plan</h3>
                <h4>Dos</h4>
                <ul>
                    {planList[listIndex] ? planList[listIndex].items_suggested.map((item) => {
                        return (
                            <Chip label={item} variant="outlined" />
                        )
                    }) : ""}
                </ul>
                <h4>don'ts</h4>
                <ul>
                    {planList[listIndex] ? planList[listIndex].items_avoid.map((item) => {
                        return (
                            <Chip label={item} variant="outlined" />
                        )
                    }) : ""}
                </ul>
            </div>
        </>
    )
}

export default Input