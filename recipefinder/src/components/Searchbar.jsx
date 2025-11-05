import { useState, useEffect } from 'react';
import axios from 'axios';
import './searchbar.css';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [meals, setMeals] = useState([]);

    const searchMeals = async (query) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            setMeals(response.data.meals || []); 
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    const randomMeal = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`); 
            setMeals(response.data.meals || []);
            } catch (error) {
        console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (searchTerm) {
            const delaySearch = setTimeout(() => {
                 searchMeals(searchTerm);
            }, 100);
            return () => clearTimeout(delaySearch);
        } 
        else {
            randomMeal();
        }
    }, [searchTerm]);



  return (
    <div className="app-container">
        <h1>Meal Finder App</h1>
        <input
        type="text"
        placeholder="Search for a meal..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-4">
                            {meals.map(
                                    (meal,index) => {
                                        return (
                                            <div className="col-12 col-md-6 col-lg-4"key={meal.idMeal}>

                                                <div class="card">
                                                   
                                                    <div class="card-body"> <Link to={`/recipe/${meal.idMeal}`}> <img
                                                        src={meal.strMealThumb}
                                                        className="card-img-top"
                                                        alt="..."
                                                        style={{ height: '200px', objectFit: 'cover' }}
                                                    /> </Link> 

                                                        <h5 class="card-title">{meal.strMeal}</h5>
                                                        <p class="card-text">{meal.strCategory}</p>
                                                    </div>
                                                    <ul class="list-group list-group-flush">
                                                        <li class="list-group-item">Country of Origin:{meal.strArea}</li>
                                                        <li class="list-group-item">Main Ingredient:{meal.strIngredient1}</li>
                                                        <li class="list-group-item"> Instructions:{meal.strInstructions.slice(0,100)}...</li>
                                                    </ul>
                                                    <div class="card-body d-flex justify-content-between ">
                                                        <a href={meal.strYoutube} class="card-link">watch video</a>
                                                        <a href={meal.strSource} class="card-link">view source</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                )}
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
   

  )
}
export default Searchbar