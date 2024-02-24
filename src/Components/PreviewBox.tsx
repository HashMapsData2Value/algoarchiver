export default function PreviewBox ({ fullMessage }: { fullMessage: string}) {

    return (
        <div>
            <h1 className="text-4xl font-bold">Preview</h1>
            <p className="text-lg">
                {fullMessage}
            </p>
        </div>
    );
}