import { useEffect, useState } from "react";
import React from "react";
import NavBarComponent from "../components/NavBarComponent";
import StarRating from "../components/StarRating";
import siteLogo from "../assets/GreenSiteLogo.jpg"
import MapComponent from "../components/MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import L from "leaflet";
import tempIcon from "../assets/tempDustbinMarker.png";
import { Marker, useMapEvent } from "react-leaflet";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const CollectionRequestPage = () => {
    const [addDustbin, setAddDustbin] = useState(null);
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [phNo, setphNo] = useState('');
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [garbageType, setGarbageType] = useState('domestic_dry');
    const [collectionDate, setCollectionDate] = useState('');

    // Event listeners on map
    const EventListenerComponent = () => {
        useMapEvent("click", (e) => {
            console.log("Clicked on ", e.latlng);
            setAddDustbin({
                lat: e.latlng.lat,
                lng: e.latlng.lng
            })
        })

        return null;
    }

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    }

    const handlePhNoChange = (e) => {
        setphNo(e.target.value);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handleGarbageTypeChange = (e) => {
        setGarbageType(e.target.value);
    }

    const handleCollectionDateChange = (e) => {
        setCollectionDate(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(fullName == '') {
            alert('Please provide your full name');
            return;
        }
        else if(phNo == '') {
            alert('Please provide your Phone No.');
            return;
        }
        else if(address == '') {
            alert('Please provide your full address');
            return;
        }
        else if(quantity == '') {
            alert('Please provide the approximate garbage quantity');
            return;
        }
        else if(garbageType == '') {
            alert('Please select a garbage type');
            return;
        }
        else if(collectionDate == '') {
            alert('Please select the collection date and time');
            return;
        }

        const response = await fetch(`${backendURL}/reqCollection/submit`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                userId,
                fullName,
                address, 
                quantity, 
                phone_no : phNo, 
                garbageType, 
                location : addDustbin,
                collectionDate,
            })
        });

        const data = await response.json();

        alert(data.message);
        if(response.ok) {
            setFullName('');
            setphNo('');
            setAddress('');
            setQuantity('');
            setGarbageType('dry');
            setCollectionDate('');
            setAddDustbin(null);
        }

    }

    // custom icon for temporaty checkpoint
    const tempMarker = new L.icon({
        iconUrl: tempIcon,
        iconSize: [30, 30],
        iconAnchor: [15, 22],
        popupAnchor: [0, -45]
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if(storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setUserId(parsedToken.id);
        }
    }, []);

    return (
        <>
            <div className="w-full top-0 z-10">
                <NavBarComponent />
            </div>

            <div className="feedbackContainer min-h-[calc(100vh-4rem)] flex flex-col justify-between items-center px-6">
                <div className="relative p-10 pb-7 mt-16 mb-10" style={{boxShadow: "10px 10px 20px 4px rgb(0 0 0 / 0.1), -10px -10px 20px 4px rgb(0 0 0 / 0.1)"}}>
                    <div
                        className="logoContainer absolute h-24 w-24 flex justify-center items-center rounded-full top-0 left-1/2 -translate-1/2 overflow-hidden"
                        style={{boxShadow: "5px 5px 10px 4px rgb(0 0 0 / 0.1), -5px -5px 10px 4px rgb(0 0 0 / 0.1)"}}
                    >
                        <img src={siteLogo} alt="" className="mix-blend-darken" />
                    </div>
                    <div className="text-green-600 text-center my-3">
                        <h1>Request A Quick Collection</h1>
                    </div>
                    <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-2 gap-20">
                            <div className="flex flex-col gap-7">
                                <div className="flex flex-col gap-2">
                                    <p>Full Name</p>
                                    <div className="feedbackOptions p-2 text-lg border-2 border-gray-300 rounded-sm flex gap-10">
                                        <div>
                                            <input
                                                type="text" className="outline-none"
                                                value={fullName}
                                                onChange={handleFullNameChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p>Address</p>
                                    <div className="feedbackOptions p-3 border-2 border-gray-300 rounded-sm">
                                        <input
                                            type="text" className="outline-none"
                                            value={address}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <p>Garbage Type</p>
                                    <div className="feedbackOptions p-3 border-2 border-gray-300 rounded-sm">
                                        <select
                                            className="outline-none w-full"
                                            value={garbageType}
                                            onChange={handleGarbageTypeChange}
                                        >
                                            <option value="domestic_dry">Domestic Dry</option>
                                            <option value="domestic_wet">Domestic Wet</option>
                                            <option value="domestic_mixed">Domestic Mixed</option>
                                            <option value="commercial_dry">Commercial Dry</option>
                                            <option value="commercial_wet">Commercial Wet</option>
                                            <option value="commercial_mixed">Commercial Mixed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-7">
                                <div className="flex flex-col gap-2">
                                    <p>Phone No.</p>
                                    <div className="feedbackOptions p-2 text-lg border-2 border-gray-300 rounded-sm flex gap-10">
                                        <div>
                                            <input
                                                type="text" className="outline-none"
                                                value={phNo}
                                                onChange={handlePhNoChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p>Estimated Garbage Quantity (KG)</p>
                                    <div className="feedbackOptions p-3 border-2 border-gray-300 rounded-sm">
                                        <input
                                            type="text" className="outline-none"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p>Date Of Collection</p>
                                    <div className="feedbackOptions p-2 text-lg border-2 border-gray-300 rounded-sm flex gap-10">
                                        <div className="w-full">
                                            <input
                                                type="datetime-local" className="outline-none w-full"
                                                value={collectionDate}
                                                onChange={handleCollectionDateChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-7 w-full">
                            <label htmlFor="">Choose Garbage Collection Point</label>
                            <div className="w-full h-52 border-2 border-gray-300 rounded-md mt-2">
                                <MapComponent zoom={11}>
                                    {addDustbin && addDustbin.lat && addDustbin.lng && (
                                        <Marker icon={tempMarker} position={[addDustbin.lat, addDustbin.lng]}>
                                        </Marker>
                                    )}
                                    <EventListenerComponent />
                                </MapComponent>
                            </div>
                        </div>
                        <input type="submit" className="inline-block w-32 bg-green-700 py-2 font-medium text-white rounded-full mt-5"/>
                    </form>
                </div>

            </div>
        </>
    )
}

export default CollectionRequestPage;