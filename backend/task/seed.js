import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import users from '../data/users.js';
import interviews from '../data/interview.js';
import articles from '../data/articles.js';


const db = await dbConnection();
await db.dropDatabase();

async function main(){
    

    try{
        let userDetails1 = await users.createUser("Siddharth","Prabhakaran",24,"sidduprabhak@gmail.com","abc12345",9083319047,`C:\Users\siddu\OneDrive\Desktop\New Resume\Siddharth Prabhakaran - Resume.pdf`,["Java","AWS","SQL"],["AI","Machine Learning","Big Data"],`C:\Users\siddu\OneDrive\Pictures\Siddharth.jpg`,["Rise of AI: Boon or Bane?","Fundamentals of Machine Learning"],["Article1","Article2"],["Interview1","Interview2"],["Interview3","Interview4"]);
        console.log(userDetails1);
    }
    catch(e){
        console.log(e);
    }

    try{
        let interviewDetails1 = await interviews.createInterview("Raj","Siddharth","04/11/2022",["Very good guidance"],["Good Technical Knowledge"]);
        console.log(interviewDetails1);
    }
    catch(e){
        console.log(e);
    }

    try{
        let articleDetails1 = await articles.createArticle("Fundamentals of AI","AI is cool",["AI","ML"]);
        console.log(articleDetails1);
    }
    catch(e){
        console.log(e);
    }

    console.log('Done seeding database');
}

await main();
await closeConnection();