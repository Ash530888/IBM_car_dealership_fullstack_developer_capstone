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

    // extracts and sets the full name of the dealer
    const fetchDealer = async () => {
        const res = await fetch(fetch_url, {
            method: "GET"
          });
          const retobj = await res.json();
          if(retobj.status === 200) {
            let dealer = retobj.dealer;
            setdealer({"full_name":dealer[0].full_name})
          }
    }

    // populates the makes and models state based on unique values from the cars
    const populateMakesAndModels = async () => {
        let tmpmakes = []
        let tmpmodels = []
        cars.forEach((car) => {
            tmpmakes.push(car.make)
            tmpmodels.push(car.model)
        })
        setmakes(Array.from(new Set(tmpmakes)));
        setmodels(Array.from(new Set(tmpmodels)));
    }

    // which populates makes and models states
    const fetchCars = async () => {
        const res = await fetch(dealer_url, {
            method: "GET"
        });
        const retobj = await res.json();
        if(retobj.status === 200) {
            let cars = Array.from(retobj.cars)
            setcars(cars);
            populateMakesAndModels(cars);
          }
    }

    const setCarsmatchingCriteria = async (matching_cars) => {
        // Copies the array of cars that match the given criteria and logs the number of matching cars
        let cars = Array.from(matching_cars)
        console.log("Number of matching cars "+cars.length);

        // retreives the selected make, model, year, etc. from html page
        let makeIdx = document.getElementById('make').selectedIndex;
        let modelIdx = document.getElementById('model').selectedIndex;
        let yearIdx = document.getElementById('year').selectedIndex;
        let mileageIdx = document.getElementById('mileage').selectedIndex;
        let priceIdx = document.getElementById('price').selectedIndex;
        // filters cars based on that
        if(makeIdx !== 0) {
            let currmake = document.getElementById('make').value;
            cars = cars.filter(car => car.make === currmake);
        }
        if(modelIdx !== 0) {
            let currmodel = document.getElementById('model').value;
            cars = cars.filter(car => car.model === currmodel);
            
        }
        if(yearIdx !== 0) {
            let curryear = document.getElementById('year').value;
            cars = cars.filter(car => car.year === curryear);
            
        }
        if(mileageIdx !== 0) {
            let currmileage = parseInt(document.getElementById('mileage').value);
            if(currmileage === 50000) {
                cars = cars.filter(car => car.mileage <= currmileage);
              } else if (currmileage === 100000){
                cars = cars.filter(car => car.mileage <= currmileage && car.mileage > 50000);
              } else if (currmileage === 150000){
                cars = cars.filter(car => car.mileage <= currmileage && car.mileage > 100000);
              } else if (currmileage === 200000){
                cars = cars.filter(car => car.mileage <= currmileage && car.mileage > 150000);
              } else {
                cars = cars.filter(car => car.mileage > 200000);
              }
        }
        if(priceIdx !== 0) {
            let currprice = parseInt(document.getElementById('price').value);
            if(currprice === 20000) {
              cars = cars.filter(car => car.price <= currprice);
            } else if (currprice === 40000){
              cars = cars.filter(car => car.price <= currprice && car.price > 20000);
            } else if (currprice === 60000){
              cars = cars.filter(car => car.price <= currprice && car.price > 40000);
            } else if (currprice === 80000){
              cars = cars.filter(car => car.price <= currprice && car.price > 60000);
            } else {
              cars = cars.filter(car => car.price > 80000);
            }
          }


        if(cars.length !== 0) {
            document.getElementById('make').value = cars[0].make;
        }
        else{
            setmessage("No cars found matching criteria");
        }

        setcars(cars);

    }

    // fetch cars by make
    const SearchCarsByMake = async () => {
        let make = document.getElementById("make").value;
        dealer_url = dealer_url+"?make="+make;
        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
          });
          const retobj = await res.json();
          if(retobj.status === 200) {
            setCarsmatchingCriteria(retobj.cars);
          }
    }

    // fetch cars by model
    const SearchCarsByModel = async () => {
        let model = document.getElementById("model").value;
        dealer_url = dealer_url+"?model="+model;
        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
          });
          const retobj = await res.json();
          if(retobj.status === 200) {
            setCarsmatchingCriteria(retobj.cars);
          }
    }

    // fetch cars by year
    const SearchCarsByYear = async () => {
        let year = document.getElementById("year").value;
        dealer_url = dealer_url+"?year="+year;
        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
          });
          const retobj = await res.json();
          if(retobj.status === 200) {
            setCarsmatchingCriteria(retobj.cars);
          }
    }

    // fetch cars by mileage
    const SearchCarsByMileage = async () => {
        let mileage = document.getElementById("mileage").value;
        dealer_url = dealer_url+"?mileage="+mileage;
        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
          });
          const retobj = await res.json();
          if(retobj.status === 200) {
            setCarsmatchingCriteria(retobj.cars);
          }
    }

    // fetch cars by price
    const SearchCarsByPrice = async () => {
        let price = document.getElementById("price").value;
        dealer_url = dealer_url+"?price="+price;
        const res = await fetch(dealer_url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
          });
          const retobj = await res.json();
          if(retobj.status === 200) {
            setCarsmatchingCriteria(retobj.cars);
          }
    }

    const reset = async () => {
        const selectElements = document.querySelectorAll('select');

        selectElements.forEach((select) => {
            select.selectedIndex = 0;
        });
        fetchCars();
    }

    useEffect(() => {
        fetchCars();
        fetchDealer();
      },[]); 

    return (
        <div>
            <Header/>
            <h1 style={{marginBottom: '20px'}}>Cars at {dealer.full_name}</h1>
            <div>
                <span style={{marginLeft: '10px', paddingLeft: '20px'}}>Make</span>
                <select name="make" id="make" onChange={SearchCarsByMake}>
                    {makes.length === 0 ? (
                        <option value=''>No data found</option>
                    ) : (
                        <>
                            <option disabled defaultValue> -- All -- </option>
                            {makes.map((make, index) => (
                                <option key={index} value={make}>{make}</option>
                            ))}
                        </>
                    )
                    }
                </select>

                <span style={{marginLeft: '10px', paddingLeft: '20px'}}>Model</span>
                <select name="model" id="model" onChange={SearchCarsByModel}>
                    {models.length === 0 ? (
                        <option value=''>No data found</option>
                    ) : (
                        <>
                            <option disabled defaultValue> -- All -- </option>
                            {models.map((model, index) => (
                                <option key={index} value={model}>{model}</option>

                            ))}
                        </>
                    )}
                </select>

                <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Year</span>
                <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="year" id="year" onChange={SearchCarsByYear}>
                    <option disabled defaultValue> -- All -- </option>
                    <option value='2024'>2024 or newer</option>
                    <option value='2023'>2023 or newer</option>
                    <option value='2022'>2022 or newer</option>
                    <option value='2021'>2021 or newer</option>
                    <option value='2020'>2020 or newer</option>
                </select>

                <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Mileage</span>
                <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="mileage" id="mileage" onChange={SearchCarsByMileage}>
                    <option selected value='all'> -- All -- </option>
                    <option value='50000'>Under 50000</option>
                    <option value='100000'>50000 - 100000</option>
                    <option value='150000'>100000 - 150000</option>
                    <option value='200000'>150000 - 200000</option>
                    <option value='200001'>Over 200000</option>
                </select>

                <span style={{ marginLeft: '10px', paddingLeft: '10px'}}>Price</span>
                <select style={{ marginLeft: '10px', marginRight: '10px' ,paddingLeft: '10px', borderRadius :'10px'}} name="price" id="price" onChange={SearchCarsByPrice}>
                    <option selected value='all'> -- All -- </option>
                    <option value='20000'>Under 20000</option>
                    <option value='40000'>20000 - 40000</option>
                    <option value='60000'>40000 - 60000</option>
                    <option value='80000'>60000 - 80000</option>
                    <option value='80001'>Over 80000</option>
                </select>

                <button style={{marginLeft: '10px', paddingLeft: '10px'}} onClick={reset}>Reset</button>
            </div>

            <div>
                {cars.length === 0 ? (
                    <p style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}>{message}</p>
                ) : (
                    <div>
                        {cars.map((car) => (
                            <div>
                                <div key={car.id}>
                                    <h3>{car.make} {car.model}</h3>
                                    <p>Year: {car.year}</p>
                                    <p>Mileage: {car.mileage}</p>
                                    <p>Price: {car.price}</p>
                                </div>
                                <hr/>
                            </div>
                        )
                    )}

                    </div>
                )}
            </div>
        </div>
    );

};

export default SearchCars;