const viewPath = 'blogs';
const Blog = require('../models/blog');
const User = require('../models/user');

const getUser = async req => {
    const { user: email } = req.session.passport;
    return await User.findOne({email: email});
}

exports.index = async (req, res) => {
    try {
        const blogs = await Blog
        .find()
        .populate('user')
        .sort({updatedAt: 'desc'});

        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({message: 'There was an error fetching the blogs', error});
    }
};

exports.show = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        .populate('user');

        res.status(200).json(blog);
    } catch (error) {
       res.status(400).json({message: "There was an error fetching the blog"});
    }
};

exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'New Blog'
    });
};

exports.create = async (req, res) => {
    try{
        const { user: email } = req.session.passport;
        const user = await User.findOne({email:email});
        const blog = await Blog.create({user: user._id, ...req.body});
        
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({message: "There was an error creating the blog post", error});
    }
};

exports.edit = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
            pageTitle: blog.title,
            formData: blog
        });
    } catch (error) {
        req.flash('danger', `There was an error accessing this blog: ${error}`);
        res.redirect('/');
    }
};

exports.update = async (req, res) => {
    try {
        const user = await getUser(req);

        let blog = await Blog.findOne({user: user._id, _id: req.body.id});
        if (!blog) throw new Error('Blog could not be found');

        const attributes = {user: user._id, ...req.body}
        await Blog.validate(attributes);
        await Blog.updateOne({_id: req.body.id, user: user._id}, {...req.body});

        
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({status: 'failed', message: `There was an error updating the blog`, error});
    }
};

exports.delete = async (req, res) => {
    try {
       await Blog.deleteOne({_id: req.body.id});
       res.status(200).json({message: "Yay"});
    } catch (error) {
        res.status(400).json({message: "There was an error deleting the blog"});
    }
};