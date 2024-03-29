import Layout from "../components/Layout";
import React from "react";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {store} from 'react-notifications-component';
import MobileLayout from "../components/MobileLayout";

const Index = (props) => {
    if (props.isMobileView) {
        return (<MobileLayout>
            <div>
                <h1 className="welcome-message">Welcome to ShopNoon Mobile!</h1>
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
                            <p className="price">{d.currency} {d.price}</p>
                            <br/>
                            <p className="description">{d.description}</p>
                            <p className="hashtags">{d.hashtags}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted"><FontAwesomeIcon icon={faHeart}/> {d.no_of_favourites} likes •
                                View {d.no_of_comments} comments</small>
                            <button className="favourite btn btn-dark" onClick={() => favouritePost({d})}>
                                <FontAwesomeIcon
                                    icon={faHeart}/></button>
                        </div>
                    </div>
                )}
            </div>
        </MobileLayout>);
    } else {
        return (<Layout>
            <div>
                <h1 className="welcome-message">Welcome to ShopNoon Desktop!</h1>
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
                            <p className="price">{d.currency} {d.price}</p>
                            <br/>
                            <p className="description">{d.description}</p>
                            <p className="hashtags">{d.hashtags}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted"><FontAwesomeIcon icon={faHeart}/> {d.no_of_favourites} likes •
                                View {d.no_of_comments} comments</small>
                            <button className="favourite btn btn-dark" onClick={() => favouritePost({d})}>
                                <FontAwesomeIcon
                                    icon={faHeart}/></button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>);
    }
}

// Get All Posts
Index.getInitialProps = async function (ctx) {
    let isMobileView = (ctx.req
        ? ctx.req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

    const getAllPost = await fetch('https://noont-backend.herokuapp.com/v1.0/posts');
    const response = await getAllPost.json();
    return {
        isMobileView: Boolean(isMobileView),
        getAllPostData: response.data
    };
}

// Favourite Post
function favouritePost(post) {
    (async () => {
        const rawResponse = await fetch('https://noont-backend.herokuapp.com/v1.0/users/123/favourites', {
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

        if (rawResponse.status !== 200) {
            store.addNotification({
                title: "Couldn't add to favourites!",
                message: "You've saved this post already.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        } else {
            store.addNotification({
                title: "Added to favourites!",
                message: " ",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        }
    })();
}

export default Index;