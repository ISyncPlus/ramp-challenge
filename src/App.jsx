import React, { useState, useEffect } from "react";

export default function App() {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    async function fetchFlag() {
      try {
        const res = await fetch("https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/636172");
        const text = await res.text();
        setFlag(text.trim());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching flag:", err);
      }
    }
    fetchFlag();
  }, []);

  useEffect(() => {
    if (!loading && flag) {
      let i = 1;
      const interval = setInterval(() => {
        setDisplayed(flag.slice(0, i));
        i++;
        if (i > flag.length) clearInterval(interval);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading, flag]);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {displayed.split("").map((char, idx) => (
        <li key={idx}>{char}</li>
      ))}
    </ul>
  );
}

// My Step 2 Script:
// [...document.querySelectorAll('section[data-id^="92"] article[data-class$="45"] div[data-tag*="78"] b.ref')] - I used ^ to get anything that starts with 92, $for ending and * for ones that have 78 in them then got b that has ref in it with b.ref. A consufion orwhat I forgot was that it was a node not array so i added ... in the beginning to have it as an array

//   .map(el => el.getAttribute('value')) got the content of each value attribute

//   .join(''); to join the texts for each vakue I got

// So everything was [...document.querySelectorAll('section[data-id^="92"] article[data-class$="45"] div[data-tag*="78"] b.ref')].map(el => el.getAttribute('value')).join('')
