import Layout from "../components/Layout";
import React from "react";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Index = (props) => (
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
                    <img className="card-img-top"
                         src={d.image}
                         alt="Card image cap"/>
                    <div className="card-body">
                        <p className="title">{d.title}</p>
                        <p className="price">{d.currency}{d.price}</p>
                        <p className="likes"><FontAwesomeIcon icon={faHeart}/> {d.no_of_favourites} likes</p>
                        <p className="description">{d.description}</p>
                        <p className="hashtags">{d.hashtags}</p>
                        <button className="favourite btn btn-dark" onClick={() => favouritePost({d})}><FontAwesomeIcon
                            icon={faHeart}/></button>
                    </div>
                    <div className="card-footer">
                        <small className="text-muted">View {d.no_of_comments} comments</small>
                    </div>
                </div>
            )}
        </div>
    </Layout>
);

// todo change url
Index.getInitialProps = async function () {
    const getAllPost = await fetch('http://noont-backend.herokuapp.com/v1.0/posts');
    const response = await getAllPost.json();
    return {
        getAllPostData: response.data
    };
}

function favouritePost(post) {
    (async () => {
        const rawResponse = await fetch('http://noont-backend.herokuapp.com/v1.0/users/123/favourites', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "is_favourite": true,
                "user_id": 123,
                "post_id": post.d.post_id,
                "title": post.d.title,
                "currency": post.d.currency,
                "price": post.d.price,
                "description": post.d.description,
                "seller_username": post.d.seller_username,
                "seller_image": post.d.seller_image
            })
        });
        const content = await rawResponse.json();
        console.log(content);
    })();
}

export default Index;