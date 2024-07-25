import { useEffect, useState } from "react"
import { Container, Input } from "reactstrap"
import axios from "axios"
import "./weather.css"
function Weather() {
    const [data, setData] = useState(null)
    const [text, setText] = useState("Ho Chi Minh")
    const [city, setCity] = useState("Ho Chi Minh")
    const [error, setError] = useState(null)
    const apiKey = "66726c794911419d74838209e5b6dd05"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const fetch = () => {
        axios.get(url)
            .then((res) => {
                console.log(res);
                setData(res.data)
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 404) {
                    setError("Invalid city name")
                }
            })
    }
    useEffect(() => {
        fetch()
    }, [city])

    const formatTimeFromTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    return (
        <Container className="ct-custom">
            <div className="contain">
                <div className="ip-contain">
                    <Input className="ip-custom" type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setCity(text)
                            setText("")
                        }
                    }} />
                </div>

                {
                    error && (
                        <h1>{error}</h1>
                    )
                }
                {
                    data &&
                    <div className="data-contain">
                        <h1>{data.name}</h1>
                        <h3><i className="fa-solid fa-location-pin"></i>Country: {data.sys.country}</h3>
                        <h3><i className="fa-solid fa-location-pin"></i>{data.name}</h3>
                        
                        <div className="description">
                            <div>
                                <h3><i className="fa-solid fa-temperature-low"></i>Temp: {data.main.temp}<i className="fa-solid fa-temperature-low"></i></h3>
                                <h3><i className="fa-solid fa-cloud"></i>Weather: {data.weather[0].description}</h3>
                            </div>
                            <div>
                                <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                            </div>
                        </div>

                        
                        <h3><i className="fa-solid fa-hourglass-start"></i>Sunrise: {formatTimeFromTimestamp(data.sys.sunrise)}</h3>
                        <h3><i className="fa-solid fa-hourglass-end"></i>Sunset: {formatTimeFromTimestamp(data.sys.sunset)}</h3>
                    </div>
                }
            </div>
        </Container>
    )
}

export default Weather