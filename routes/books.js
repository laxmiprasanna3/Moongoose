const express = require("express");

//JSON data import
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const {UserModel, BookModel} = require("../models")

const {getAllBooks,getSingleBookById,getAllIssuedBooks,addNewBook,updateBookById} = require("../controllers/book-controller");

const router = express.Router();

/* 
Router:/books
Method :GET
Description:Get all books
Access:public
parameters:None
*/

/*router.get("/",(req,res)=>{
 res.status(200).json({
      success:true,
        data:books
   })
})*/

router.get("/",getAllBooks)


/* 
Router:/books/:id
Method :GET
Description:Get a book by id
Access:public
parameters:id
*/

/*router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }
    return res.status(200).json({
        success:true,
        data:book
    })
})*/

router.get("/",getSingleBookById)


/* 
Router:/books/issued
Method :GET
Description:Get all issued books
Access:public
parameters:None
*/


/*router.get("/issued/books",(req,res)=>{
    const usersWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook) return each;
    })
    const issuedBooks = [];
    usersWithIssuedBooks.forEach((each)=>{
        const book = books.find((book)=>book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book)
    })

    if(issuedBooks.length===0){
        return res.status(404).json({
            success:false,
            message:"NO issued books yet"
        })
    }
    return res.status(200).json({
        success:true,
        data:issuedBooks
    })
})*/

router.get("/",getAllIssuedBooks)

/* 
Router:/books
Method :POST
Description:Create a new book
Access:public
parameters:None
*/
/*router.post("/",(req,res)=>{
    const {data} = req.body;
    if(!data){
        return res.status(400).json({
            success:false,
            message:"No data provided"
        })
    }
    const book =books.find((each)=>each.id===data.id);
    if(book){
        return res.status(404).json({
            success:false,
            message:"Book with given id already exist"
        })
    }
    const allBooks = [...books, data]

    return res.status(201).json({
        success:true,
        data:allBooks
    })
})*/

router.post("/",addNewBook);

/* 
Router:/books/:id
Method :POST
Description:update a book
Access:public
parameters:id
*/
/*router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const book = books.find((each)=>each.id===id);

    if(!book){
        return res.status(400).json({
            success:false,
            message:"Book Not Found with the Given Id"
        })
    }
    const updateData = books.map((each)=>{
        if(each.id===id){
            return {...each, ...data};
        }
        return each;
    })
    return res.status(202).json({
        success:true,
        data:updateData
    })
})*/

router.put("/",updateBookById);



module.exports = router;