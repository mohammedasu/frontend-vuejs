import {
    fetchPostBackendUrl,
    fetchPagePostsBackendUrl,
    fetchUserPostBackendUrl,
    groupUrl
} from "../path";
import { headerConfig } from "../setHeaders";

export default {
    namespaced: true,
    state: {
        posts: [],
        showpost: false,
        nextPage: "",
        currentPage: 0,
        previousPage: 0,
        loadmore: false,
        commentBoxVal: "",
        mainComment: "",
        lastCommentUser: {},
        replyboxcheck: false,

        post_popupmodal: false,
        post_topopupmodal: false,
        post_aspopupmodal: false,
        post_listpopupmodal: false,
        postto: "user",
        posting_as: "user",
        posting_as_data: {},
        selected_list_data: [],
        wantpost: true
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getLastCommentedUser(state) {
            return state.lastCommentedUser;
        }
    },

    mutations: {
        setPost(state, posts) {
            state.posts = posts;
        },
        setShowPost(state, payload) {
            state.showpost = payload;
        },
        setWantPost(state, payload) {
            state.wantpost = payload;
        },
        changePostTo(state, payload) {
            state.postto = payload.txt;
        },
        changePostAs(state, payload) {
            if (payload.txt == "page") {
                state.posting_as = payload.txt;
                state.posting_as_data = payload.page;
            } else if (payload.txt == "group") {
                state.posting_as = "user"; //change to user
                state.posting_as_data = payload.group;
            } else {
                state.posting_as = payload.txt;
                state.posting_as_data = {};
            }
        },
        selectedListData(state, payload) {
            state.selected_list_data = payload;
        },
        openListModal(state, payload) {
            if (payload.txt != "user") {
                state.post_topopupmodal = false;
                state.post_listpopupmodal = true;
            }
        },
        openPostModal(state, payload) {
            if (payload.txt == "postto") {
                state.post_popupmodal = false;
                state.post_topopupmodal = true;
                state.post_aspopupmodal = false;
                state.post_listpopupmodal = false;
            } else if (payload.txt == "postas") {
                state.post_popupmodal = false;
                state.post_topopupmodal = false;
                state.post_aspopupmodal = true;
                state.post_listpopupmodal = false;
            } else {
                state.post_popupmodal = true;
                state.post_topopupmodal = false;
                state.post_aspopupmodal = false;
                state.post_listpopupmodal = false;
            }
        },
        closePostModal(state, payload) {
            if (payload.txt == "postto") {
                state.post_topopupmodal = false;
            } else if (payload.txt == "postas") {
                state.post_aspopupmodal = false;
            } else if (payload.txt == "postlist") {
                state.post_listpopupmodal = false;
            } else {
                state.post_popupmodal = false;
            }
        },
        addPost(state, post) {
            const originalState = [...state.posts];
            originalState.unshift(post);
            state.posts = originalState;
        },
        deletePost(state, post) {
            state.posts.splice(state.posts.indexOf(post), 1);
        },
        updatePost(state, postload) {
            state.posts = state.posts.map(post => {
                if (post.post_ref_no === postload.post_ref_no) {
                    return postload;
                }
                return post;
            });
        },
        updateCommentCount(state, postload) {
            state.posts = state.posts.map(post => {
                if (post.post_ref_no === postload.post_ref_no) {
                    if (postload.type == "decrement") {
                        post.comment_count = post.comment_count - 1;
                    } else {
                        post.comment_count = post.comment_count + 1;
                    }

                    return post;
                }
                return post;
            });
        },
        setNextPost(state, data) {
            state.nextPage = data.next_page;
            state.currentPage = data.current_page;
        },
        setPreviousPage(state, data) {
            state.previousPage = data.current_page - 1;
            state.loadmore = false;
        },
        loadMore(state) {
            state.loadmore = true;
        },
        MorePost(state, posts) {
            const originalState = [...state.posts];
            posts.map(post => {
                const found = originalState.some(
                    el => el.post_ref_no === post.post_ref_no
                );
                if (!found) {
                    originalState.push(post);
                }
            });
            state.posts = originalState;
        },
        showReplyBox(state, val) {
            state.lastCommentUser = val.commentuser;
            state.commentBoxVal = val;
            state.mainComment = val.mainComment
                ? val.mainComment
                : val.post_comment_ref_no;
            state.replyboxcheck = true;
        },
        hideReplyBox(state) {
            state.replyboxcheck = false;
        }
    },
    actions: {
        addPost(context, post) {
            context.commit("addPost", post);
        },
        deletePost(context, post) {
            context.commit("deletePost", post);
        },
        async getPost(context, payload) {
            context.commit("showLoader", true, { root: true });
            var url = null;
            if (payload.posttxt == "page") {
                url = fetchPagePostsBackendUrl + "/" + payload.ref_no;
            } else if (payload.posttxt == "group") {
                url = groupUrl.fetchGroupPostsBackendUrl + "/" + payload.ref_no;
            } else if (payload.posttxt == "viewprofile") {
                url = fetchUserPostBackendUrl + "/" + payload.ref_no;
            } else if (payload.posttxt == "home") {
                url = fetchPostBackendUrl;
            }
            context.commit("setNextPost", { next_page: null, current_page: 0 });
            context.commit("setPreviousPage", {
                current_page: 0
            });
            context.commit("setPost", { post_data: null });

            if (url) {
                await axios.get(url, headerConfig).then(
                    response => {
                        let data = response.data.data;
                        context.commit("setPost", data.post_data);
                        context.commit("setShowPost", true);
                        context.commit("setNextPost", data);
                        context.commit("setPreviousPage", data);

                        context.commit("showLoader", false, { root: true });
                    },
                    err => {
                        context.commit("showLoader", false, { root: true });
                        return false;
                    }
                );
            }
        },
        updatePost(context, post) {
            context.commit("updatePost", post);
        },
        showReplyBox(context, val) {
            context.commit("showReplyBox", val);
        },
        hideReplyBox(context) {
            context.commit("hideReplyBox");
        },
        async loadMore(context) {
            if (
                context.state.nextPage != "" &&
                context.state.nextPage != null &&
                context.state.previousPage != context.state.currentPage &&
                context.state.loadmore
            ) {
                context.commit("showLoader", true, { root: true });
                await axios.get(context.state.nextPage, headerConfig).then(
                    response => {
                        let data = response.data.data;
                        context.commit("setNextPost", data);
                        context.commit("setPreviousPage", data);
                        context.commit("MorePost", data.post_data);
                        context.commit("showLoader", false, { root: true });
                    },
                    err => {
                        context.commit("showLoader", false, { root: true });
                        return false;
                    }
                );
            }
        }
    }
};
