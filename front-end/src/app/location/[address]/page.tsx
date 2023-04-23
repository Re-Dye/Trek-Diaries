export default function LocationPage({ params }: { params: { address: string } }) {
    return(
        <div>
            { params.address }
        </div>
    )
}