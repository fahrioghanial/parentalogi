import { posts } from "../../../data/posts";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const newPost = {
      id: Date.now(),
      title: req.body.title,
      tag: req.body.tag,
      content: req.body.content,
    };
    const JSONdata = JSON.stringify(newPost);
    posts.push(newPost);
    res.status(201).json(newPost);
  }
}
