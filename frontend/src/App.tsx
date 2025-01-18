import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [inputs, setInputs] = useState("");
  const [response, setResponse] = useState("");
  const [loading ,setLoading]=useState(false);
  // if(loading){
  //   return <div>
  //     loading...
  //   </div>
  // }

  async function sendReq(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true)
      const result = await axios.post(`https://summary-ai.onrender.com/create-story`, {
        prompt: inputs
      });
      setLoading(false)
      setResponse(result.data.story);
    } catch (error) {
      console.error('Error:', error);
      setResponse("An error occurred while processing your request");
    }
  }

  return (
    <div className='max-w-2xl mx-auto flex px-4'>
      <div className='py-8 flex flex-col justify-center'>
        <h1 className='text-4xl font-bold mb-4'>
          <span className='text-5xl'>URL to summary</span> <br /> with power of AI
        </h1>
        <p className='pb-6'>You can generate summary for any website/page ,just copy and paste the url here</p>
        <form className='flex flex-col justify-center' onSubmit={sendReq}>
          <input
            className='bg-transparent text-white border-2 rounded-full px-4 py-2 w-full'
            onChange={(e) => setInputs(e.target.value)}
            type="url"
            placeholder='http://...'
          />
          <button className='bg-emerald-600 text-white mt-4 border rounded-full font-semibold p-2' type="submit">
            Create summary
          </button>
        </form>
      </div>
      <div className='p-8'>
        <div className='bg-gray-300 overflow-auto w-[360px] h-[420px] text-gray-700 font-semibold rounded-lg p-4'>
         { loading==true ? "loading...": response}
          {response || "No response yet"}
        </div>
      </div>
    </div>
  );
}

export default App;
