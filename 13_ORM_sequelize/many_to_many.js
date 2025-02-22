import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",   
  decimalNumbers: true
});


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database: ", error);
});



const WebArticle = sequelize.define("WebArticle", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    },content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    timestamps:false
});

const Tag = sequelize.define("Tag", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        validate: {
            len: [2, 16]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
},{
    timestamps:false
});

const ArticleTag = sequelize.define("ArticleTag", {},{
    timestamps:false
});

try{
    WebArticle.belongsToMany(Tag,{
        through: ArticleTag,
        foreignKey: 'fk_webarticle_id'
    });
    Tag.belongsToMany(WebArticle, {
        through: ArticleTag,
        foreignKey: 'fk_tag_id'
    });

    await WebArticle.sync();
    await Tag.sync();
    await ArticleTag.sync();

    const webarticle = await WebArticle.create({
        title: 'title 1',
        content: 'content'
    });

    const tag1 = await Tag.create({
        name: 'tag 1',
        description: 'tag1'
    });

    await webarticle.addTag(tag1);
    await tag1.addWebArticle(webarticle);

    const tag2 = await Tag.create({
        name: 'tag 2',
        description: 'tag2'
    });

    await webarticle.addTag(tag2);
    await tag2.addWebArticle(webarticle); 

    const webarticleDB = await WebArticle.findByPk(webarticle.dataValues.id,{
        include: [{
            model: Tag
        }]
    })

    console.log(webarticleDB);


}catch(err){
    console.log(err);
}

await sequelize.close();
