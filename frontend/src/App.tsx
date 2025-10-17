import { useState } from 'react';
import { Client, Functions } from 'appwrite';
import './App.css';

function App() {
  const [inputs, setInputs] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize Appwrite client
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite Cloud endpoint
    .setProject('YOUR_PROJECT_ID'); // 🔹 replace with your Appwrite Project ID

  const functions = new Functions(client);

  async function sendReq(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setResponse("");

      // Execute Appwrite Cloud Function
      const result = await functions.createExecution(
        'YOUR_FUNCTION_ID', // 🔹 replace with your Appwrite Function ID
        JSON.stringify({ prompt: inputs })
      );

      const resData = JSON.parse(result.responseBody);
      setResponse(resData.story);
    } catch (error) {
      console.error('Error:', error);
      setResponse("An error occurred while processing your request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='max-w-2xl mx-auto flex px-4'>
      <div className='py-8 flex flex-col justify-center'>
        <h1 className='text-4xl font-bold mb-4'>
          <span className='text-5xl'>URL to Summary</span> <br /> with Power of AI
        </h1>
        <p className='pb-6'>
          Paste any webpage URL below to get a quick summary powered by Gemini AI.
        </p>

        <form className='flex flex-col justify-center' onSubmit={sendReq}>
          <input
            className='bg-transparent text-white border-2 rounded-full px-4 py-2 w-full'
            onChange={(e) => setInputs(e.target.value)}
            type="url"
            placeholder='http://...'
            required
          />
          <button
            className='bg-emerald-600 text-white mt-4 border rounded-full font-semibold p-2'
            type="submit"
          >
            {loading ? 'Loading...' : 'Create Summary'}
          </button>
        </form>
      </div>

      <div className='p-8'>
        <div className='bg-gray-300 overflow-auto w-[360px] h-[420px] text-gray-700 font-semibold rounded-lg p-4'>
          {loading ? "Generating summary..." : response || "No response yet"}
        </div>
      </div>
    </div>
  );
}

export default App;
