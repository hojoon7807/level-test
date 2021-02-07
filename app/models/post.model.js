module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        published: {
            type: Sequelize.BOOLEAN
        },
    },
        {
            timestamps: true,
            paranoid: true,
        });

    return Post;
};