import { useState } from "react"
import Books from "../components/Books/Books"
import Header from "../components/Header/Header"
import Title from "../components/Title/Title"

const Home = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="bg home_div">
            <Header />
            <Title setOpen={setOpen} />
            <Books open={open} setOpen={setOpen} />
        </div>
    )
}

export default Home