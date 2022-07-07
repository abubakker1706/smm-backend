const router = require('express').Router()
const PostModel = require('../model/PostModel')
const SocialPost = require("social-post-api");
const API_KEY="5FM70SC-CBJ42S0-NM9MH7Y-6Z08DPY";
const social = new SocialPost(API_KEY);

router.post('/post',async (req,res) => {

                         //const {post,mediaUrls} = req.body;
                         
                         try{
                         
                          const Post = social.post({
                          post:  req.body,
                          platforms: req.body,
                          mediaUrls:  req.body
                         })
                        console.log(Post);
                                                  
                   const history = await social.history()
                        
                       
                                                                           
                         console.log(history);
                        
                         res.status(202).json({Post})
                            

                         }catch(err){
                         console.log(err)
                         }
                         /** post */
                        
                       
                         /** history */
                        
                         /** delete */
                       //   const deletePost = await social.delete({ id: post.id })
                       //      .catch(console.error);
                       //   console.log(deletePost);
                       })


 module.exports = router


