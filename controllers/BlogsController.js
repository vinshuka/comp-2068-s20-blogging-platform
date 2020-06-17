const viewPath = ('blogs');
const Blog = require('../models/blog');

exports.index = (req, res) => {
    res.send('Got to catch em all');
};

exports.show = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render(`${viewPath}/show`, {
        pageTitle: blog.title,
        blog: blog
    });
};

exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Blog'
    });
};

exports.create = async (req, res) => {
    try{
        const blog = await Blog.create(req.body)
        res.redirect(`/blogs/${blog.id}`);
    } catch (err) {
        res.send(err);
    }
};

exports.edit = (req, res) => {
    res.send('Hey there');
};

exports.update = (req, res) => {
    res.send('Wowza');
};

exports.delete = (req, res) => {
    res.send('goodbye');
};