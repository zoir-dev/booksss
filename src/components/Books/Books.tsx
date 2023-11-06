import { useEffect, useState } from 'react'
import './style.css'
import Book from './Book'
import { BooksType } from './typing'
import { http } from '../../api/http'
import './style.css'
import BooksModal from './BooksModal'
const Books = ({ open, setOpen }: { open: boolean, setOpen: (val: boolean) => void }) => {
    const [books, setBooks] = useState([{}, {}, {}, {}, {}])
    const fetchBooks = () => {
        http.get('/books').then(d => console.log(d))
    }
    const data = localStorage.getItem('data')
    console.log('data', JSON.parse(data))
    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <div className='books'>
            {books.map((b: BooksType) => (
                <Book b={b} />
            ))}
            <BooksModal open={open} setOpen={setOpen} />
        </div>
    )
}

export default Books