## Scutter CMS

Scutter CMS is a learning project of mine.

I will be running a few sites off it, my personal blog https://g33k.me a meme blog that shares products with the word “daddy” in them https://ohdaddy.fun and a site for Scutter CMS https://scuttercms.com

I have set aside some goals to accomplish.
- [x]Needs to linkable blog posts.
- [ ]Needs a way to add and edit pages. 
- [ ]I want a page where I can upload images so I can add them in a post.




## Files Description

- `config.json`: Configuration file containing database credentials and server port.
- `server.js`: Main server file that handles route registration, error handling, and server startup.
- `models/Post.js`: Mongoose model for blog posts.
- `models/Page.js`: Mongoose model for static pages.
- `routes/index.js`: Route handling for the homepage.
- `routes/about.js`: Route handling for the About page.
- `routes/posts.js`: Route handling for individual blog posts.
- `routes/admin.js`: Route handling for the admin area, including authentication middleware.
- `views/template.ejs`: The base template for the blog, including the header and footer.
- `views/index.ejs`: The homepage of the blog, displaying a list of recent blog posts.
- `views/about.ejs`: The About page, displaying static content.
- `views/posts.ejs`: The individual blog post page, displaying a single post.
- `public/`: The public folder containing static assets like CSS, JavaScript, and images.

