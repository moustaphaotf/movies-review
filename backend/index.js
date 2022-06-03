import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from './dao/moviesDAO.js';
import ReviewDAO from './dao/reviewsDAO.js';


async function main(){  
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.MOVIESREVIEW_DB_URI);
    const port = process.env.PORT || 8000;

    try{
        // connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client);
        await ReviewDAO.injectDB(client);

        app.listen(port, () => console.log("Server is running on port : " + port));
    }
    catch(e){
        console.error(e);
        process.exit(1); 
    } 
} 

main().catch(console.error);