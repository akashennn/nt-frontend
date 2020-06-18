import Layout from "../components/Layout";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

const Favourite = (props) => (
    <Layout>
        <div>
            <h1 className="welcome-message">Welcome to ShopNoon!</h1>
            {props.getAllPostData.map(d =>
                // <p>{d.id}</p>
                <div className="card">
                    <div className="card-header">
                        <img className="seller-image"
                             src={d.seller_image}
                             alt="User Image"/>
                        <p className="seller-username">{d.seller_username}</p>
                    </div>
                    <div className="card-body">
                        <p className="title">{d.title}</p>
                        <p className="price">{d.currency}{d.price}</p>
                        <p className="likes"><FontAwesomeIcon icon={faHeart}/> {d.no_of_favourites} likes</p>
                        <p className="description">{d.description}</p>
                        <p className="hashtags">{d.hashtags}</p>
                    </div>
                    <div className="card-footer">
                        <button className="delete-favourite btn btn-danger" onClick={() => deleteFavourite({d})}>Remove</button>
                    </div>
                </div>
            )}
        </div>
    </Layout>
);


// GetAllPosts
Favourite.getInitialProps = async function () {
    const getAllPost = await fetch('http://noont-backend.herokuapp.com/v1.0/users/123/favourites');
    const response = await getAllPost.json();
    return {
        getAllPostData: response.data
    };
}

// Delete Favourite
function deleteFavourite(post) {
    (async () => {
        const url = "http://noont-backend.herokuapp.com/v1.0/users/123/favourites/posts/" + post.d.post_id
        const rawResponse = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const content = await rawResponse.json();
        if(content.data.code === 200){
            window.location.reload();
        }
    })();
}

export default Favourite;