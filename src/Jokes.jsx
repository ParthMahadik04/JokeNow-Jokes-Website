import { useEffect } from "react";
import {useState} from "react";
import "./index.css";
import Confetti from 'js-confetti';


export default function Jokes(){
    const confetti = new Confetti()

    let [joke,setJoke]=useState({})
    const [count, setCount] = useState(0)

    const URL= import.meta.env.VITE_API_URL;

    const getNewJoke=async ()=>{
        let response = await fetch(URL);
        let jsonResponse = await response.json();
        setJoke({setup: jsonResponse.setup,punchline: jsonResponse.punchline});
        confetti.addConfetti()
        setCount(c => c + 1)
    }

    useEffect(()=>{
        async function getFirstJoke(){
            let response = await fetch(URL);
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            setJoke({setup: jsonResponse.setup,punchline: jsonResponse.punchline})
        }
        getFirstJoke();
    },[]);

    return(
        <div>
            <h3>Jokes that will make you laugh!</h3>
            <h2>{joke.setup}</h2>
            <h2>{joke.punchline}</h2>
            <button onClick={getNewJoke}>New Joke</button>
        </div>
    )
}