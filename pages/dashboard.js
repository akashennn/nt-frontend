import Layout from "../components/Layout";
import React from "react";
import MobileLayout from "../components/MobileLayout";
import {store} from "react-notifications-component";

const Favourite = (props) => {
    if (props.isMobileView) {
        return (
            <MobileLayout>
                <div>
                    <h1 className="welcome-message">Your Favourites!</h1>
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
                                <p className="price">{d.currency} {d.price}</p>
                                <br/>
                                <p className="description">{d.description}</p>
                                <p className="hashtags">{d.hashtags}</p>
                            </div>
                            <div className="card-footer">
                                <button className="delete-favourite btn btn-danger"
                                        onClick={() => deleteFavourite({d})}>Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </MobileLayout>
        );
    } else {
        return (
            <Layout>
                <div>
                    <h1 className="welcome-message">Your Favourites!</h1>
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
                                <p className="price">{d.currency} {d.price}</p>
                                <br/>
                                <p className="description">{d.description}</p>
                                <p className="hashtags">{d.hashtags}</p>
                            </div>
                            <div className="card-footer">
                                <button className="delete-favourite btn btn-danger"
                                        onClick={() => deleteFavourite({d})}>Remove
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        );
    }
    ;
};


// GetAllPosts
Favourite.getInitialProps = async function (ctx) {
    let isMobileView = (ctx.req
        ? ctx.req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )

    const getAllPost = await fetch('https://noont-backend.herokuapp.com/v1.0/users/123/favourites');
    const response = await getAllPost.json();
    return {
        isMobileView: Boolean(isMobileView),
        getAllPostData: response.data
    };
}

// Delete Favourite
function deleteFavourite(post) {
    (async () => {
        const url = "https://noont-backend.herokuapp.com/v1.0/users/123/favourites/posts/" + post.d.post_id
        const rawResponse = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (rawResponse.status !== 200) {
            store.addNotification({
                title: "Couldn't delete to favourites!",
                message: "You've deleted this post already.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true
                }
            });
        } else {
            store.addNotification({
                title: "Favourites deleted successfully!",
                message: " ",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 1000,
                    onScreen: true
                }
            });
            window.location.reload();
        }
    })();
}

export default Favourite;