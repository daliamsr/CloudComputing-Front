// MessagesSubmit.jsx
import React from 'react';
import axios from 'axios';
import { LANGUAGES_ARRAY, DEFAULT_MAIL } from '../utils/constants';

function MessagesSubmit() {

    const handleMessageSend = async (e) => {
        const language = e.target.value;
        const senderName = document.getElementById('senderName').value;
        const receiverMail = document.getElementById('receiverMail').value;
        const pictureLink = document.getElementById('messageContent').value;

        try {
          let pictureLabels = await axios.get(
            `${process.env.REACT_APP_API_URL}/labels`,
            {
                pictureLink
            });
    }
    catch (error) {
        alert('Something went wrong');
        console.log(error);
    }
        }

        try {
            let response = await axios.post(
                `${process.env.REACT_APP_API_URL}/messages/foreign`,
                {
                    language,
                    senderName,
                    senderMail: DEFAULT_MAIL,
                    receiverMail,
                    pictureLabels
                });

                if(response.status === 200) {
                    alert(`Your original messages was in ${response.data.translationData.originalLanguage}. \nMessage sent: ${response.data.translationData.translatedText}`);
                }
        }
        catch (error) {
            alert('Something went wrong');
            console.log(error);
        }
    }

    return (
        <div id="MessagesSubmit">
            <div className='text-2xl font-bold mb-4'>Submit your message</div>
            <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="senderName">
                            Your name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="senderName" type="text" placeholder="John" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="receiverMail">
                            Receiver mail
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="receiverMail" type="text" placeholder="jane@mail.com" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="messageContent">
                            Your picture
                        </label>
                        <textarea
                            rows={4}
                            name="comment"
                            id="messageContent"
                            className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800 rounded-md p-5"
                            placeholder={'Link to the image you want analyzed.'} />
                    </div>
                </div>
            </form>

            {/* Create a button for each language from LANGUAGES_ARRAY */}
            {LANGUAGES_ARRAY.map((language, index) => {
                return (
                    <button
                        key={index}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 capitalize"
                        onClick={handleMessageSend}
                        value={language}>
                        {language.toLowerCase()}
                    </button>
                )
            })}
        </div>
    );
}

export default MessagesSubmit;