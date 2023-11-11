import { Button } from "@mui/material"
import plus from '../../assets/plus.png'
import './style.css'
import { ModalFormValues } from "../Books/typing"

interface thisProps {
    setOpen: (val: boolean) => void,
    books: Array<ModalFormValues>,
    search: string,
    setSearch: (val: string) => void
}
const Title = ({ setOpen, books, search, setSearch }: thisProps) => {
    return (
        <div className="title_div">
            <div className="title_left">
                <h1>You've got <span>{books?.length} books</span></h1>
                <p>Your task today</p>
            </div>
            <div className="title_right">
                <input
                    type="search"
                    placeholder="Enter a book"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="main_button" variant="contained" onClick={() => setOpen(true)}>
                    <img src={plus} alt="" />
                    <span>
                        Create a book
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default Title