import { useState, useRef } from 'react';

import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';


export default function FileHashForm({ setHash } : { setHash: (hash: string) => void }) {
  const toast = useRef(null);
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
      } else {
        (toast.current as Toast | null)?.show({severity: 'error', summary: 'Error', detail: 'Please select a file.', life: 2000});
        setHash('');
      }
    }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Toast ref={toast} position="bottom-center"/>
        <FileUpload 
          name="demo[]" 
          customUpload 
          uploadHandler={handleFileChange} 
          chooseLabel="Select File" 
          auto
          itemTemplate={(file, props: { onRemove: (event: React.SyntheticEvent<Element, Event>) => void }) => (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>{(file as File).name}</div>
              <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" onClick={(event) => {
                props.onRemove(event)
                setFile(null)
                setHash('')
                }} />
            </div>
          )}
        />
      </div>
      <br />
      <Button label="Calculate Hash" type="submit" />
    </form>
  );
};