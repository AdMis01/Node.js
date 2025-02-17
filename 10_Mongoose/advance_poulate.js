import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/mongoosetest";
mongoose.connect(url);

const authorSchema = new mongoose.Schema({
    name: String,
    email: String,
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page"
    }]
});

const Author = mongoose.model("Author", authorSchema);

const pageSchema = new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    body: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Page = mongoose.model("Page", pageSchema);

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page"
    },
    body: String
});

const Comment = mongoose.model("Comment", commentSchema);

await Author.deleteMany({});
    await Comment.deleteMany({});
    await Page.deleteMany({});

async function createAuthor(author) {
    return await Author.create(author);
}

async function addPageToAuthor(page, author) {
    const dbAuthor = await Author.findByIdAndUpdate(
        author._id,
        { $push: { pages: page._id } },
        { new: true }
    );
    return dbAuthor;
}

async function createPage(page, author) {
    page.author = author._id;
    const pageDb = await Page.create(page);
    await addPageToAuthor(pageDb, author);
    return pageDb;
}

async function addCommentToPage(comment, page) {
    const dbPage = await Page.findByIdAndUpdate(
        page._id,
        { $push: { comments: comment._id } },
        { new: true }
    );
    return dbPage;
}

async function createComment(page, author, comment) {
    comment.page = page._id;
    comment.author = author._id;
    const commentDb = await Comment.create(comment);
    await addCommentToPage(commentDb, page);
    return commentDb;
}

const author1 = await createAuthor({ name: "Ania", email: "ania@wp.pl" });
const author2 = await createAuthor({ name: "Joanna", email: "Joanna@wp.pl" });

const page1 = await createPage({ title: "Page #1", body: "Page #1 content" }, author1);

await createComment(page1, author1, { body: "Comment 1" });
await createComment(page1, author1, { body: "Comment 2" });
await createComment(page1, author2, { body: "Comment 3" });

//console.log("Dane zostały dodane do bazy danych!");
const authorData = await Author.find({}).populate({
    path: 'pages',
    populate: {
        path: 'comments'
    }
});

console.log(JSON.stringify(authorData,null, 4));

const pageData = await Page.find({}).populate({
    path:'comments',
    populate: {
        path: 'author'
    }
});

console.log(JSON.stringify(pageData,null, 4));

const pageData2 = await Page.find({}).populate([{
    path:'comments',
    populate: {
        path: 'author'
    }  
},{
    path: 'author'
}
]);

console.log(JSON.stringify(pageData2,null, 4));
