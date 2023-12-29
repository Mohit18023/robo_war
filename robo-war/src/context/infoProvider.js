import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InfoContext = React.createContext();

function InfoProvider(props) {
  const navigate = useNavigate();
  const [user,setUser] = React.useState();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if(!userInfo) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[navigate]);

  return (
    <InfoContext.Provider value={{user,setUser}}>
        {props.children}
    </InfoContext.Provider>

  )
}

export default InfoProvider ;
