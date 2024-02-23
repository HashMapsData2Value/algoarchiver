import { useState } from 'react';

import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';


export default function FileHashForm({ setHash } : { setHash: (hash: string) => void }) {
  const [file, setFile] = useState(null);

const handleFileChange = (event: any) => {
  setFile(event.files[0]);
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
      <div style={{ width: '50%', margin: '0 auto' }}>
        <FileUpload 
          name="demo[]" 
          customUpload 
          uploadHandler={handleFileChange} 
          chooseLabel="Select File" 
          auto
          itemTemplate={(file, props) => (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>{file.name}</div>
              <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" onClick={() => props.onRemove(file)} />
            </div>
          )}
        />
      </div>
      <br />
      <Button label="Calculate Hash" type="submit" />
    </form>
  );
}