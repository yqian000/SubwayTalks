import React from 'react';

import Header from './components/header';
import Body from './components/Body';

function PostPage(){

    
    return ( 
            <div>
                  <Header userName = "userName001" 
                          userId = "1234567"
                  /> 
                <div> 
                    <Body userName = "userName001"
                          userId = "1234567"
                    />
                </div>
            </div>
            );
}

export default PostPage;
