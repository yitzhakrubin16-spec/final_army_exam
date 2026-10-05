import { useNavigate } from "react-router-dom";


function MainPage() {
    const navigate = useNavigate();
    function handleClick(url:string) {
        navigate(url);
    }
  
    return (
    <>
    <h1>Watching Eye System</h1>
    <button onClick={() => handleClick('/alerts')}>Alerts</button>
    <button onClick={() => handleClick('/add_alert')}>Add alert</button>
    
    </>
  )
}

export default MainPage