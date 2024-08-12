import express from "express";
import bodyParser from "body-parser";

// Seting global constants
const port = 3000;
const app = express();

// Seting midleware and the static folder
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Handeling different GET HTTP requests
app.get("/", (req, res) => {
    res.render("index.ejs", { postsArr: posts });
});

app.get("/write-post", (req, res) => {
    // Using the same page template newPostform.ejs page for both editing and writing a new post

    if(req.query["postId"]){
        // Edit button has been pressed
        res.render("newPostForm.ejs", {
            postToEdit: posts[getPostIndexById(req.query["postId"])],
        });
    }
    else
        // New post button has been pressed
        res.render("newPostForm.ejs");
});

app.get("/read-post", (req, res) => {
    res.render("postPageTemplate.ejs", {
        reqPost: posts[getPostIndexById(req.query["postId"])],
    });
});

app.get("/delete-post", (req, res) => {
    let delPostIndex = getPostIndexById(req.query["postId"]);
    posts.splice(delPostIndex, 1);
    res.render("index.ejs", { postsArr: posts });
});

// Handling different POST HTTP requests
app.post("/publish-post", (req, res) => {
    if(req.query["postId"])
    {
        // Edited post
        if(req.body["postContent"])
        {
            posts[getPostIndexById(req.query["postId"])]["fName"] = req.body["fName"];
            posts[getPostIndexById(req.query["postId"])]["lName"] = req.body["lName"];
            posts[getPostIndexById(req.query["postId"])]["email"] = req.body["email"];
            posts[getPostIndexById(req.query["postId"])]["title"] = req.body["title"];
            posts[getPostIndexById(req.query["postId"])]["postContent"] = req.body["postContent"];
        }
    }
    else
    {
        // New post
        let postId = {id: posts.length.toString()};
        if(req.body["postContent"])
            posts.push(Object.assign({}, postId, req.body));
    }
    res.render("index.ejs", { postsArr: posts });
});





/* Auxilery Functions */
function getPostIndexById(id){
    for (let i = 0; i < posts.length; i++){
        if(id === posts[i]["id"])
            return i;
    }
    return -1;
}

/* Example Posts */
var posts = [
    {
        id: '0',
        fName: 'Gur',
        lName: 'Shalev',
        email: 'shalev.gur@gmail.com',
        title: 'What are the elements of jazz?',
        postContent:
        `
        What are the elements of Jazz? Jazz is a music with many different elements, and styles. As previously discussed in What Makes Jazz Different from Other Music? the form retains it’s essential character no matter what influences it absorbs. Some of the earliest examples of Jazz can found in the music of James Reese Europe who adapted marching band and European classical, adding spice by the addition of syncopation. Other early examples of the genesis of Jazz. However, the first Jazz recording was not made until 1917, “Dixieland Jazz Band One Step”, by the Original Dixieland Jazz Band, a group of white musicians. The groups attempted to approximate the feeling of music from artists such as King Oliver, but by the time the first recordings of Louis Armstrong appeared, the difference between what people thought Jazz sounded like vs. authentic playing from Armstrong and other New Orleans musicians was stunning.
        The above paragraph is just a brief summation of the music’s beginnings. It is now time to turn attention to the elements of Jazz. The key elements of Jazz include: blues, syncopation, swing and creative freedom. Improvisation in music is not new, as there are traditions of improvisation in India, Africa, and Asia. Beethoven, Mozart and Bach all improvised, as well, but Jazz improvisation is special due to the use of the blues scale. The blues scale has a universal appeal that reaches the core of emotional satisfaction.
        Syncopation prevents music from getting boring. It is the very thing that can catch the listener by surprise, and it is a vital element of Jazz. Jazz musicians will vary their phrases by not playing the same note durations repeatedly, otherwise the rhythm can get rather stale. Another way to consider syncopation places emphasis on strong and weak beats. For advanced musician and particularly drummers, check out Ralph Peterson in this clip.
        From syncopation, we go to swing. Swing is often a subjective quality to fans of different types of Jazz, but it is the feeling that gives forward momentum to a performance. The feeling of swing is created by a swung eighth note. Eighth notes by themselves are worth half a beat, think of the rhythm in which water drips when it’s moderately fast, that is a straight eighth note. A swing eighth note comes in the form of a group of three notes, called triplets. The first eighth note in the pair is slightly longer than last two, so what ends up occuring is a rhythmic feel that is a short-long sequence, that many Jazz musicians often refer to as “spang-a-lang”. The pattern can be broken down as Long-short-long, and for example, Jazz drummers will vary this pattern on the ride cymbal by not always swinging on the first eighth note but add different emphasis to the second or third, further adding syncopation. Drummer Billy Higgins for example liked to swing on the third triplet, creating a laid back swing. If much of this seems too challenging, a simple way of thinking about swing, is a laid back quality which pushes behind the rhythm. Another important variation of the swing rhythmic feel is the shuffle, a trademark of Art Blakey.
        `,
        date: '2024/07/23'
    },
    {
        id: '1',
        fName: 'Nadav',
        lName: 'Halperin',
        email: 'Nadav.Halperin@gmail.com',
        title: `Sourdough Bread: A Beginner’s Guide`,
        postContent:         
        `
        In 2013, my resolution was to bake more bread.
        I researched, tested, and baked countless loaves with both good and bad results. My journey began with this no-knead artisan bread recipe and eventually, I worked my way up to the holy grail: homemade sourdough bread. Admittedly, I had beginner’s luck. My loaves came out looking great, with the occasional hockey puck or two. But when people started asking for the recipe, I froze. I couldn’t remember what I did… or how I did it. I didn’t write anything down!
        Now, with over 13 years of sourdough bread experience paired with my professional culinary background, I understand this craft from the ground up. I understand the fear, the hesitation, the excitement, the curiosity, the basics… and teaching others from a practical standpoint is my specialty.
        I also wrote an international best selling cookbook! Artisan Sourdough Made Simple dives deeper into this “lost” culinary art, showcasing a multitude of creative sourdough bread recipes and clear step-by-step photos. So, if you’re curious about sourdough bread and don’t know where to begin, start here. My beginner sourdough bread recipe has been THE MOST popular recipe on my blog for over a decade and continues to earn millions of page views a month. Welcome to the journey.
        `,
        date: '2023/03/05'
    },
    {
        id: '2',
        fName: 'Samuel',
        lName: 'Foix',
        email: 'Samuel.Foix@gmail.com',
        title: `Dermatologist’s choice on 11 ingredients for hyperpigmentation`,
        postContent:
        `
        In this article, Dr. Anna Chacon, board-certified dermatologist talks about the 11 best ingredients widely used by dermatologists for their remarkable efficacy in addressing the treatment of hyperpigmentation. 
        Hyperpigmentation, which often arises due to several factors such as sun exposure, acne scars, or aging, is a common challenge for many individuals.      
        By learning more about the unique benefits of these 10 exceptional ingredients, you will gain valuable insights on how they can help you achieve a brighter, more even complexion. 
        Whether you are dealing with stubborn age spots, melasma, or post-inflammatory hyperpigmentation, this article equips you with the knowledge to make informed choices so you and your virtual dermatology provider can choose the best treatment for melasma, a type of hyperpigmentation.
        Hyperpigmentation is a very common condition that results in the darkening of specific skin areas due to an excess of melanin causing dark spots or patches  on the skin that range from brown, black, gray, to red or pink1.
        Freckles, sun spots, age spots, acne scars, and melasma are different types of hyperpigmentation, and while these dark spots are harmless, they can impact a person’s self-esteem. 
        Fortunately, a combination of lifestyle adjustments and treatments can prove effective in managing hyperpigmentation.
        `,
        date: '2023/05/25'
    }
];
