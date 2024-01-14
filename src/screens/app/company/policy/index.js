import PolicyCard from "../components/PolicyCard"
import PolicyForm from "../components/PolicyForm"


const Policy = () => {
    return (
        <div className="px-24">
            <div>
                <PolicyForm />
            </div>
            <div className="mt-6">
                <PolicyCard />
            </div>
        </div>
    )
}

export default Policy