module.exports = function(app, fs)
{
     app.get('/',function(req,res){
         res.render('index', {
             title: "MY HOMEPAGE",
             length: 5
         })
     });

     app.get('/about',function(req,res){
      res.render('about', {
         title: "ABOUT",
         length: 10
      })
  });
}