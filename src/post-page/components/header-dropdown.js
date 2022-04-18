import React from 'react'; 

import dataHeaderDropDown from './dataHeaderDropDown';


function DropDown(){
    const [filterState, setFilterState] = React.useState("");

    const [arrayDropMenuFeeds, setMenuFeeds] = React.useState(
        returnFilteredMenu(filterState, "FEEDS")
    );
    const [arrayDropMenuOthers, setMenuOthers] = React.useState(
        returnFilteredMenu(filterState, "OTHERS")
    );

    function handleChange(event){
        const {value} = event.target ;
        setFilterState( (prevFilter)=>{
            return value;
        })
    }

    function returnFilteredMenu(filter, section){
        if( filter === "") {
            return dataHeaderDropDown.filter( 
                element => element.section === section) ;
        }
        else{
            return dataHeaderDropDown.filter( 
                element => element.section === section && element.title.toLowerCase().includes(filter.toLowerCase())
            );
        }
    }


    React.useEffect( function(){
        setMenuFeeds( ()=> returnFilteredMenu(filterState, "FEEDS"));
        setMenuOthers( ()=> returnFilteredMenu(filterState, "OTHERS"));

    }, [filterState]);

        
    const dropMenuFeedsElements = arrayDropMenuFeeds.map((element) =>{
            return <a href= {element.anchor}> {element.icon} {element.title} </a>
    } ) ;
                            
    const dropMenuOthersElements = arrayDropMenuOthers.map( (element) => {
            return <a href= {element.anchor}> {element.icon} {element.title} </a>
    });



    return (<div class="dropdown-content">
                <input  type= "text" 
                        placeholder='Filter'
                        className='filter' 
                        onChange={handleChange}
                        name = "filterState"
                        value = {filterState}
                />
                {dropMenuFeedsElements.length !==0 && <p> FEEDS </p>}
                {dropMenuFeedsElements}
                {dropMenuOthersElements.length !==0 && <p> OTHERS</p>}
                {dropMenuOthersElements}
            </div>); 
}

export default DropDown;