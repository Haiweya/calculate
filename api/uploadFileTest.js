const express=require('express')
const router=express.Router();
const passport = require('passport');

router.get('/testFile', passport.authenticate('jwt',{session:false}), (req, res) => {
    res.send(`
      <h2>With <code>"express"</code> npm package</h2>
      <form action="http://localhost:3000/api/uploadFile/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
    `);
  });

  module.exports=router;