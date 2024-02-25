import { InputTextarea } from 'primereact/inputtextarea'

export default function DescriptionInputArea({
  desc,
  setDesc,
}: {
  desc: string
  setDesc: (desc: string) => void
}) {
  const styles =
    desc.trim() === '' ? { borderColor: 'red' } : { borderColor: 'green' }
  return (
    <div>
      <h1 className="text-4xl font-bold">Description</h1>
      <p className="text-lg">
        Please provide a short description of the file that can assist you in
        searching for it in the future.
      </p>
      <InputTextarea
        autoResize
        value={desc}
        onChange={(e) => setDesc(e.target.value.slice(0, 100))}
        rows={5}
        cols={50}
        style={styles}
      />
    </div>
  )
}
