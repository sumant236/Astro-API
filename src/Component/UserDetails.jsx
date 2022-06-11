import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import validator from 'validator';
import styles from "./Styles.module.css"
import { Astrology } from './Astrology';
import { Loader } from './Loader';
import { getData, setData } from './Storage';

export const UserDetails = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [selectDay, setSelectDay] = useState("");
    const [selectSign, setSelectSign] = useState("");
    const [emailError, setEmailError] = useState('');
    const [finalData, setFinalData] = useState([]);
    const [localData, setLocalData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const validateEmail = (e) => {
        var email = e.target.value
      
        if (validator.isEmail(email)) {
          setEmailError('Valid Email :)')
        } else {
          setEmailError('Enter valid Email!')
          setEmail("");
        }
    }

    const handleClick = async () => {
        if(name === "" || email === "" || selectDay === "" || selectSign === "" || selectSign === undefined){
            alert("Please enter all the details. Thank you!!")
            return;
        }
        setLoading(true);
        const URL = `https://aztro.sameerkumar.website/?sign=${selectSign}&day=${selectDay}`;
        await fetch(URL, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(res => {
            setLocalData({
                name: name,
                email: email,
                date: res.date_range,
                day: selectDay,
                current_date: res.current_date,
                description: res.description,
                compatibility: res.compatibility,
                mood: res.mood,
                color: res.color,
                lucky_number: res.lucky_number,
                lucky_time: res.lucky_time,
            })
            console.log(localData);
            setData(localData);
            setShowDetails(true);      
        })
        .catch(err=>console.log(err))

        setName("");
        setEmail("");
        setSelectDay(undefined);
        setSelectSign(undefined);
        setLoading(false);
    }

    const days = [
        {label: "Yesterday", value: "yesterday"},
        {label: "Today", value: "today"},
        {label: "Tomorrow", value: "tomorrow"}
    ]
    const signs = [
        {label: "Aquarius", value: "aquarius"},
        {label: "Aries", value: "aries"},
        {label: "Cancer", value: "cancer"},
        {label: "Capricon", value: "capricon"},
        {label: "Gemini", value: "gemini"},
        {label: "Leo", value: "leo"},
        {label: "Libra", value: "libra"},
        {label: "Pisces", value: "pisces"},
        {label: "Sagittarius", value: "sagittarius"},
        {label: "Scorpio", value: "scorpio"},
        {label: "Taurus", value: "taurus"},
        {label: "Virgo", value: "virgo"},
    ]

    const validEmail = {
        color: "green",
        fontWeight: "bold"
    }
    const invalidEmail = {
        color: "red",
        fontWeight: "bold"
    }

    useEffect(()=>{
        const data = getData();
        console.log(data);
        setFinalData(data);
    }, [])
  return (
      <div>
        <div className= {styles.inputBox}>
            <div className="field col-12 md:col-4"  style={{maxWidth: "18%", margin: "0px", padding: "0px"}}>
                <span className="p-float-label">
                    <InputText type="text" className="p-inputtext-sm block mb-2" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="inputtext">Name</label>
                </span>
            </div>
            <div className="field col-12 md:col-4"  style={{maxWidth: "18%", margin:"0px", padding: "0px"}}>
                <span className="p-float-label">
                    <InputText type="text" className="p-inputtext-sm block mb-2" value={email} onChange={(e) => {validateEmail(e); setEmail(e.target.value)}}/>
                    <label htmlFor="inputtext">Email</label>
                    <span style={emailError==="Valid Email :)"? validEmail: invalidEmail}>{emailError}</span>
                </span>
            </div>
            <Dropdown value={selectDay} options={days} onChange={(e) => setSelectDay(e.value)} placeholder="Select a Day" className= {styles.dropdown}/>
            
            <Dropdown value={selectSign} options={signs} onChange={(e) => setSelectSign(e.value)} filterd filterBy="label"
            placeholder="Select a Sign" className= {styles.dropdown}/>
            <Button label="Check Astrology" icon="pi pi-check" iconPos="right" className={styles.btn} onClick={handleClick}/>
        </div>
        {loading? <Loader /> : (showDetails ? <Astrology data={finalData} name={name} sign={selectSign}/> : null)}
    </div>
  )
}
