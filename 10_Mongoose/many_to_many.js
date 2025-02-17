import mongoose, { mongo } from "mongoose";

const url = 'mongodb://127.0.0.1:27017/mongoosetest';

mongoose.connect(url);


const tagSchema = new mongoose.Schema({
    name: String,
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
});

const Tag = mongoose.model('Tag', tagSchema);

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

const Article = mongoose. model('Article', articleSchema);

await Tag.deleteMany({});
await Article.deleteMany({});


async function createArticle(article) {
    return await Article.create(article)
}

async function createTag(tag) {
    return await Tag.create(tag)
}

async function addTagToArticle(article,tag) {
    const abArt = await Article.findByIdAndUpdate(
        article._id,
        {$push: {tags: tag._id}},
        {new: true}
    )

    const dbTag = await Tag.findByIdAndUpdate(
        tag._id,
        {$push: {articles: article._id}},
        {new: true}
    )
}

async function getArticleData(id) {
    return Article.findOne(id).populate('tags');
}

async function getTagData(id) {
    return await Tag.findById(id).populate('articles');
}


let art1 = await createArticle({
    title: 'Article #1',
    author: 'Ania',
    content: 'Content #1'
});

let tagHtml = await createTag({name: 'html'});
let tagCss = await createTag({name: 'css'});
let tagJs = await createTag({name: 'js'});

await addTagToArticle(art1,tagHtml);
await addTagToArticle(art1,tagCss);
await addTagToArticle(art1,tagJs);

let art2 = await createArticle({
    title: 'Article #2',
    author: 'Jan',
    content: 'Contenet #2'
})

await addTagToArticle(art2,tagCss);

const articleDb = await getArticleData(art1._id);
console.log(articleDb);