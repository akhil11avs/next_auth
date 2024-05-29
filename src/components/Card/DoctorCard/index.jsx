import React from 'react'
import { useTheme } from '@mui/material/styles';

import Typography from '@/components/Typography'

import Card from '..'
import './doctorCard.scss';
import CardMedia from '../CardMedia'
import CardContent from '../CardContent'

const DoctorCard = ({ name, url, specialization, degree, expiration }) => {
  const theme = useTheme();
  return (
    <Card className='doctor_card_container'>
      <CardMedia
        component="img"
        image={url || '/assets/images/photo.jpg'}
        alt={name}
      />
      <Typography
        className="doctor_card_specification"
        sx={{ backgroundColor: theme?.palette?.primary?.main }}
      >
        {specialization}
      </Typography>
      <CardContent>
        <Typography className="doctor_card_name" color="text.primary">{name}</Typography>
        <Typography className="doctor_card_other" color="text.primary">{degree}</Typography>
        <Typography className="doctor_card_other" color="text.secondary">{expiration}</Typography>
      </CardContent>
    </Card>
  )
}

export default DoctorCard