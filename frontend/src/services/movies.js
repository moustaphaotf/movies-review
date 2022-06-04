import axios from 'axios';

class MovieDataService{
    getAll(page = 0){
        return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`);
    }

    get(id){
        return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
    }

    find(query, by='title', page=0){
        return axios.get(`http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`);
    }

    createReview(data){
        return axios.post('http://localhost:5000/api/v1/movies/review', data);
    }

    updateReview(data){
        axios.put('http://localhost:5000/api/v1/movies/review', data);
    }

    deleteReview(data){
        axios.delete('http://localhost:5000/api/v1/movies/review', data);
    }

    getRatings(){
        return axios.get('http://localhost:5000/api/v1/movies/ratings');
    }
}

export default new MovieDataService();