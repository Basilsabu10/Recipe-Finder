import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Recipe = () => {
  const { idmeal } = useParams();
  const [mealdetail, setMealdetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMealDetail = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setMealdetail(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    } 
    finally {
      setLoading(false);
    } 
  };

  useEffect(() => {
    fetchMealDetail(idmeal);
  }, [idmeal]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans p-4">
      <div className="text-slate-100 text-xl">Loading...</div>
    </div>;
  }

  

  return (
  <div className="bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            
            
            <div className="text-center mb-4">
              <img 
                src={mealdetail.strMealThumb} 
                alt={mealdetail.strMeal}
                className="img-fluid rounded"
                style={{ 
                  width: '300px', 
                  height: '225px', 
                  objectFit: 'cover'
                }}
              />
            </div>
            
           
            <h1 className="text-center text-primary mb-4 h2">
              {mealdetail.strMeal}
            </h1>

            
            <div className="col mb-4">
              <div className="col-md-6">
                <p><strong>Category:</strong> {mealdetail.strCategory}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Cuisine:</strong> {mealdetail.strArea}</p>
              </div>
            </div>

           
            <div className="mb-4">
              <h3 className="text-primary h4 mb-3">Instructions</h3>
              <div className="border rounded p-3 bg-white">
                <p style={{ whiteSpace: 'pre-line' }}>
                  {mealdetail.strInstructions}
                </p>
              </div>
            </div>

           
            <div className="text-center mb-4">
              
                <a 
                  href={mealdetail.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary me-3 mb-2"
                >
                  Watch Video
                </a>

              
               
            </div>

            
            <div className="text-center">
              <button 
                onClick={() => window.history.back()} 
                className="btn btn-secondary"
              >
                ← Back
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
 );
};

export default Recipe;
