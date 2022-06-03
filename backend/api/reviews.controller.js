import ReviewsDAO from '../dao/reviewsDAO.js';

export default class ReviewController{
    static async apiPostReview(req, res, next){
        try{
            const movieId = req.body.movie_id;
            const review = req.body.review;

            const userInfo = {
                _id: req.body.user_id,
                name: req.body.name
            };

            const date = new Date();
            
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId, 
                userInfo,
                review,
                date
            );

            res.json({status:"success"});
        }  
        catch(e){
            res.status(500).json({error: e.message});
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id;
            const review = req.body.review;

            const date = new Date();

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id, 
                review,
                date
            )

            var {error} = ReviewResponse;
            if(error){
                res.status(500).json({error});
            }

            if(ReviewResponse.modifiedCount === 0){
                throw new Error("Unable to update review. User may not be original poster");
            }
            
            res.json({status:"success"});
        }
        catch(e){
            res.status(500).json({error: e.message});
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.body.review_id;
            const user_id = req.body.user_id;

            const reviewResponse = await ReviewsDAO.deleteReview(reviewId, user_id);
            
            const {error} = reviewResponse;
            if(error){
                res.status(500).json({error});
            }

            if(reviewResponse.deletedCount === 0){
                throw new Error("Unable to delete review. User may not be original poster");
            }

            res.json({status: "success"});
        }   
        catch(e){
            res.status(500).json({error : e.message});
        }
    }
}
  
