import React, { useState } from 'react';

export default function FileHashForm(hash: any, setHash: any) {
  const [file, setFile] = useState(null);

const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
};

const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (file) {
        const arrayBuffer = await (file as File).arrayBuffer();
        const hashBuffer = await window.crypto.subtle.digest('SHA-512', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setHash(hashHex);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Calculate Hash</button>
      {hash && <p>SHA-512 hash: {hash}</p>}
    </form>
  );
}