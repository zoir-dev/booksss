import { Card } from "@mui/material";
import { BooksType } from "./typing"
import deleteIcon from '../../assets/trash.png'
import edit from '../../assets/edit.png'

const Book = (b: BooksType) => {

    return (
        <div className="book_div">
            <Card className="book">
                <h3>title</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, aspernatur!</p>
                <div className="footer">
                    <p>2023-year</p>
                    <span>211 pages</span>
                </div>
            </Card>
            <div className="actions">
                <img src={deleteIcon} alt="" />
                <img src={edit} alt="" />
            </div>
        </div>
    )
}

export default Book