import React, { useEffect, useState } from 'react'
import './Contact.css'


const Contact = () => {
    const [infoContact, setinfoContact] = useState("")
    useEffect(() => {
        axios.get(
            '/api/socials',
            {
            }
        ).then((response) => {
            (setinfoContact(response.data[1])
            )
        }).catch(erroe => console.log(erroe))
    }, [])
    return (
        <div>
            <h2 className='titleSocial' >Contact</h2>
            <div className="contactContainer">
                <div className="facebook">
                    <a target="_blank" href={infoContact && infoContact[0].url}>
                        <img src="/images/facebook.png" alt="" />
                    </a>
                </div>
                <div className="GitHub">
                    <a target="_blank" href={infoContact && infoContact[1].url}>
                        <img src="/images/GitHub.png" alt="" />
                    </a>
                </div>
                <div className="linkd">
                    <a target="_blank" href={infoContact && infoContact[2].url}>
                        <img src="/images/linkd.png" alt="" />
                    </a>
                </div>
                <div className="gmail">
                    <a href="mailto:yazan.kh.anam@gmail.com">
                        <img src="/images/gmail.png" alt="" />
                    </a>
                </div>

            </div>
        </div>

    )
}

export default Contact