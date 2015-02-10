<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset='utf-8' />

    <title>Home Page</title>
     <link rel="stylesheet" href="experiments/css/homePage.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
     <script src="experiments/js/home.js"></script>
</head>

<body>

    <div class="pad">

        <form id="form1" runat="server">

            <div>

                <ul class="master_navigation">
                    <li class="logo">  
                           <span class="logomain">Web Dev Home</span>
                           <span class="logohover" onclick="location.reload();">Refresh Page &emsp;</span>
                    </li>
                    <li class="sitestatistics">
                            <a href="sitestatistics/" target="_blank">
                                <h3>SiteStatistics<span></span></h3>
                            </a>
                    </li>
                    <li class="statistics">
                        <a href="statistics/" target="_blank">
                            <h3>Statistics<span></span></h3>
                        </a>
                    </li>
                    <li class="source">
                        <a href="source/" target="_blank">
                            <h3>Source<span></span></h3>
                        </a>
                    </li>
                    <li class="search">
                        <a href="search/" target="_blank">
                            <h3>Search<span></span></h3>
                        </a>
                    </li>
                    <li class="searchtree">
                        <a href="searchtree/" target="_blank">
                            <h3>SearchTree<span></span></h3>
                        </a>
                    </li>
                    <li class="textview">
                        <a href="textview/" target="_blank">
                            <h3>TextView<span></span></h3>
                        </a>
                    </li>
                    <li class="filelist">
                        <a href="filelist.aspx" target="_blank">
                            <h3>FileList<span></span></h3>
                        </a>
                    </li>
                    <li class="autofile">
                        <a href="autofile.aspx" target="_blank">
                            <h3>AutoFile<span></span></h3>
                        </a>
                    </li>
                    <li class="automiage">
                        <a href="images/autoimage.aspx" target="_blank">
                            <h3>Images<span></span></h3>
                        </a>
                    </li>
                    <li class="blog">
                        <a href="blog/" target="_blank">
                            <h3>Blog<span></span></h3>
                        </a>
                    </li>

                    <li class="experiments">
                            <a href="story/index.htm?../experiments/" target="_blank">
                                <h3>Experiments<span></span></h3>
                            </a>
                    </li>
                </ul>
            </div>
            
            <hr />
            <div class="container">
                <div class="self_image" id="image_div">
                    <img class="self_image" src="experiments/images/round_self.jpg" />
                </div>
                <div class="self_details">
                    <h3>Shakti Prasad Patro</h3>
                    <p>
                        Hi, I am Shakti. I am pursuing Masters in Computer Science at Northeastern University. 
                        I have keen interest in developing websites and working on latest web technologies.
                        I have worked on Java, Spring Hibernate technologies along with jquery and Backbone.js.
                        In the web development course I want to further my knowledge on MEAN stack.
    
                        During the course I will be doing a lot of <a href="story/index.htm?../experiments/" target="_blank">experiments</a>. 
                        Also, I will work on developing a <a href="#" target="_blank">project</a> at the end of the semester. 
                       All my experiments can be found on the <a href="https://github.com/patro88/Web-Development" target="_blank"> GitHub</a>.</p>
                    <p>
                        I look forward to learn and implement all the new concepts I learn in this course.
                        
                        
                    </p>    
                        
                    

                </div>
            </div>
            <div class="contact">
                Contact me here:<br>
                <a href="https://www.linkedin.com/pub/shakti-prasad-patro/14/671/822" target="_blank" id="linkedLink"><img src="experiments/images/linkedin-icon.jpg" id="linkedImage"></a>
                <a href="https://www.facebook.com/shaktiprasad200" target="_blank" id="fbLink"><img src="experiments/images/fb-icon.jpg" id="fbImage"></a>
                <a href="https://plus.google.com/u/0/+shaktiprasadpatro/about" target="_blank" id="googleLink"><img src="experiments/images/google-icon.jpg" id="googleImage"></a>
                <a href="https://twitter.com/shaktiprasad200" target="_blank" id="twitterLink"><img src="experiments/images/twitter-icon.jpg" id="twitterImage"></a>
       
            </div>
        </form>
       
        <footer>
            <div class="footer">
                &copy; Shakti Prasad Patro | Northeastern University | All rights reserved .
            </div>
        </footer>
        


    </div>

</body>
</html>
