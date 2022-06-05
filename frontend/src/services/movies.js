import axios from 'axios';
const hostname="https://motf-moviesapp.herokuapp.com"

class MovieDataService{
    getAll(page = 0){
        return axios.get(`${hostname}/api/v1/movies?page=${page}`);
    }

    get(id){
        return axios.get(`${hostname}/api/v1/movies/id/${id}`);
    }

    find(query, by='title', page=0){
        //console.log(query, by);
        return axios.get(`${hostname}/api/v1/movies?${by}=${query}&page=${page}`);
    }

    createReview(data){
        return axios.post(`${hostname}/api/v1/movies/review`, data);
    }

    updateReview(data){
        return axios.put(`${hostname}/api/v1/movies/review`, data);
    }

    deleteReview(id, userId){
        return axios.delete(
            `${hostname}/api/v1/movies/review`,
            {data : {review_id:id, user_id:userId}}
        );
    }

    getRatings(){
        return axios.get(`${hostname}/api/v1/movies/ratings`);
    }
}

export default new MovieDataService();