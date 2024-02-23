export default function PreviewBox ({ desc, hash }: { desc: string, hash: string}) {

    return (
        <div>
            <h1 className="text-4xl font-bold">Preview</h1>
            <p className="text-lg">
                {desc}
            </p>
            <p className="text-lg">
                {hash}
            </p>
        </div>
    );
}