import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "../assets/style.css";
import Header from '../Header/Header';

const SearchCars = () => {
    const [cars, setcars] = useState([]);
    const [makes, setmakes] = useState([]);
    const [models, setmodels] = useState([]);
    const [dealer, setdealer] = useState([]);
    const [message, setmessage] = useState([]);
    const { id } = useParams(); // Extract the 'id' parameter from the URL

    let dealer_url = `/djangoapp/get_inventory/${id}`;
    let fetch_url = `/djangoapp/dealer/${id}`;

    const fetchDealer = async () => {
        const res = await fetch(dealer_url, {
            method: "GET"
        });
        const retobj = await res.json();
        if(retobj.status === 200) {
            let all_dealers = Array.from(retobj.dealers)
            let states = [];
            all_dealers.forEach((dealer)=>{
              states.push(dealer.state)
            });
      
            setStates(Array.from(new Set(states)))
            setDealersList(all_dealers)
            setOriginalDealers(all_dealers)
          }

    }

    const fetchCars = async () => {
        const res = await fetch()
    }


}