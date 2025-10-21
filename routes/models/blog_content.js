const mongoose = require('mongoose');

const blockContentSchema = new mongoose.Schema({
    author_id: mongoose.Schema.Types.String,
    blog_blocks: [mongoose.Schema.Types.Mixed]
});

const BlockContent = mongoose.model('BlockContent', blockContentSchema);

const HeaderBlock = BlockContent.discriminator('Header', new mongoose.Schema({
    blog_title: mongoose.Schema.Types.String,
    blog_subtitle: mongoose.Schema.Types.String,
    blog_author: mongoose.Schema.Types.String,
    blog_date: mongoose.Schema.Types.String
}));

const PureImageBlock = BlockContent.discriminator('Pure_image', new mongoose.Schema({
    img_url: mongoose.Schema.Types.String,
    img_footer: mongoose.Schema.Types.String
}));

const PureContentBlock = BlockContent.discriminator('Pure_content', new mongoose.Schema({
    blog_paragraphs: [mongoose.Schema.Types.String]
}));

const ImgAndContentBlock = BlockContent.discriminator('Img_and_content', new mongoose.Schema({
    img_url: mongoose.Schema.Types.String,
    img_footer: mongoose.Schema.Types.String,
    blog_paragraphs: [mongoose.Schema.Types.String],
    orientation: mongoose.Schema.Types.String
}));

const ReferencesBlock = BlockContent.discriminator('References', new mongoose.Schema({
    blog_references: [{
        blog_reference_apa: mongoose.Schema.Types.String,
        blog_reference_url: mongoose.Schema.Types.String
    }]
}));

module.exports = {
    BlockContent,
    HeaderBlock,
    PureImageBlock,
    PureContentBlock,
    ImgAndContentBlock,
    ReferencesBlock
};