import React from 'react';
import PropTypes from 'prop-types';


import Rating from '@mui/material/Rating';
import { Label } from 'semantic-ui-react';


import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import MoodBadIcon from '@mui/icons-material/MoodBad';

const customFaceIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon/>,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function FaceIconContainer(props) {
  const { value, ...other } = props; 
  return <span {...other}>{customFaceIcons[value].icon}</span>;
}

function getLabelTextFace(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${customFaceIcons[value].label}`;
}

FaceIconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


const customWorriedIcons = {
  1: {
    icon: <MoodBadIcon />,
    label: 'Not dangerous at all',
  },
  2: {
    icon: <MoodBadIcon />,
    label: 'Low dangerous',
  },
  3: {
    icon: <MoodBadIcon />,
    label: 'Mildly dangerous',
  },
  4: {
    icon: <MoodBadIcon />,
    label: 'Very dangerous',
  },
  5: {
    icon: <MoodBadIcon />,
    label: 'Extremely dangerous',
  },
};


function WorriedFaceIconContainer(props) {
  const { value, ...other } = props; 
  return <span {...other}>{customWorriedIcons[value].icon}</span>;
}

WorriedFaceIconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};


function getLabelTextDangerLevel(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${customWorriedIcons[value].label}`;
}



export default function RadioGroupRating(props) {
  return (
      <div className='rating-overall-section'>
            <div className='rating-overall'>
                <Label> <h2 className='rating-label'> Overall Train Experience*: </h2>  </Label> 
                <div className='rating-faces'> 
                    <Rating   
                    name="highlight-selected-only"
                    IconContainerComponent={FaceIconContainer}
                    highlightSelectedOnly
                    value={props.value}
                    onChange = {props.handleChange}
                    getLabelText = {getLabelTextFace}
                    
                    />
                </div>     
                {props.value !== null && (
                <h2 className='dynamic-text'>
                    {customFaceIcons[props.value].label}
                </h2>
                )}         
            </div> 
            <div className='rating-overall'>
                <Label> <h2 className='rating-label'> Danger Rate*: </h2>  </Label> 
                <div className='rating-faces'> 
                    <Rating   
                    name="simple-controlled"
                    IconContainerComponent={WorriedFaceIconContainer}  
                    value={props.valueDanger}
                    onChange = {props.handleDangerChange}
                    getLabelText = {getLabelTextDangerLevel}  
                    />
                </div>     
                {props.valueDanger !== null && (
                <h2 className='dynamic-text'>
                    {customWorriedIcons[props.valueDanger].label}
                </h2>
                )}          
            </div> 
          
      </div>
    
  );
}