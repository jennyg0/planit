import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from 'axios'; 
import PlanDetail from "./PlanDetail";
import PlanResults from "./PlanResults";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import '../planlist.css'

export default function PlanList (props) {
  const [form, setForm] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState("");
  const [plans, setPlans] = useState([]); 
  const [planDetails, setPlanDetails] = useState(false); 
  const history = useHistory();

  const handleChange = (event) => {
    const { id, value } = event.target
    setState(prev => ({
      ...prev, 
      [id] : value
    }))
  }

  const showForm = () => {
    return (
      <div> 
      <div class="plan-void"></div>
       <form id= "add-app">
       <label>Start your adventure</label>
       <input type="name"
              id="name"
              placeholder="Name your day plan" 
              name="name" 
              class="plan-list-name"
              value={state.name}
              onChange={handleChange}
               />
          <label>Date </label>
          <DatePicker id="plan-list-datepicker" selected={startDate} onChange={date => setStartDate(date)} />
          <button class="create-card-buttons" onClick={onClick}>Create</button>
        </form>
      </div>
      );
  }
  
  // SAVE PLAN TO DATABASE
  const savePlan = () => {
    const planDate = {
      "name": state.name,
      "date": startDate
    }; 
    
    axios.post('/api/plans/plan', planDate)
    .then(function(response) {
      history.push('/'); 
    })
    .catch(function (error) {
  }); 
  }

  const onClick = (e) => {
    e.preventDefault();
    savePlan();
  }
 
  useEffect (() => {
    axios.get("/api/plans")
    .then(function(response){
      setPlans([...response.data])
    });
  }, [planDetails])

  //when user clicks show details button, return this
  const showPlanDetails = () => {
    const plan = plans.find(plan => plan.id === planDetails)
    return (
        <PlanDetail key={props.key} {...plan} toggleDisplay={() => setPlanDetails(false)}/>
    )
  }

return (
  <div>
  { planDetails ? showPlanDetails() :
    <div class="plan-list">
    {form ? showForm() : 
    <div class="plan-parents">
      <div class="plan-void"></div>   
       {plans ?    
         <div class="individual-plan">
           <button onClick={() => setForm(true)} class="new-plan-btn">Create a new plan</button>
           <PlanResults plans={plans} onClick={(id) => setPlanDetails(id)}/>   
         </div> : null}  
      </div>  
    } 
    </div>
  }
  </div>
  );
}
