import { useState } from "react"
import Books from "../components/Books/Books"
import Header from "../components/Header/Header"
import Title from "../components/Title/Title"
import ProtectedRoute from "./ProtectedRoute"

const Home = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [books, setBooks] = useState<any[]>([])
    const [search, setSearch] = useState('')
    return (
        <ProtectedRoute>
            <div className="bg home_div">
                <Header />
                <Title setOpen={setOpen} books={books} search={search} setSearch={setSearch} />
                <Books open={open} setOpen={setOpen} books={books} setBooks={setBooks} search={search} />
            </div>
        </ProtectedRoute>
    )
}

export default Home