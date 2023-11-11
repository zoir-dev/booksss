import { Card } from "@mui/material";
import deleteIcon from '../../assets/trash.png'
import edit from '../../assets/edit.png'
import { ModalFormValues } from "./typing";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useState } from "react";
import Alert from '../Alert'

interface thisProps {
    b: ModalFormValues,
    setBooks: (val: ModalFormValues[]) => void,
    setType: (val: string) => void,
    setModal: (val: boolean) => void
}
const Book = ({ b, setBooks, setType, setModal }: thisProps) => {
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        const userData = localStorage.getItem('data')
        const dataa = JSON.parse(userData ? userData : '')
        const res = 'DELETE' + `/books/${b.book ? b.book.id : b.id}` + dataa.secret
        const token = CryptoJS.MD5(res).toString()
        await axios.delete(`https://0001.uz/books/${b.book ? b.book.id : b.id}`, {
            headers: {
                "Content-Type": "application/json",
                Key: dataa.key,
                Sign: token,
            }
        }).then((e) => {
            setMessage("The book deleted successfully!")
            setOpen(true)
            setBooks(e.data.data.map(d => d?.book))
        }).catch(e => {
            setOpen(true)
            setMessage(e.response.data.message)
        })
    }

    return (
        <div className="book_div">
            <Card className="book">
                <h3>{b?.title || "Title"}</h3>
                <a href={b?.cover} target="_blank">{b?.cover || "Cover"}</a>
                <div className="footer">
                    <p>{b?.author || "Athor"}:{b?.published || 2023}-year</p>
                    <span>211 pages</span>
                </div>
            </Card>
            <div className="actions">
                <img src={deleteIcon} alt="" onClick={handleDelete} />
                <img src={edit} alt="" onClick={() => { setType('Edit'), setModal(true) }} />
            </div>
            <Alert
                open={open}
                setOpen={setOpen}
                message={message}
                severity={message.includes('successfully') ? 'success' : 'error'} />
        </div>
    )
}

export default Book