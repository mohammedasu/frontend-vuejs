import { Episode } from "../path";
import mixinRequest from "../mixins/request";

export default {
    mixins: [mixinRequest],
    methods: {
        async fetchEpisode() {
            const episode_ref_no = this.$route.params.episode_ref_no;
            const data = await this.getRequest(
                Episode.fetchEpisode + "/" + episode_ref_no
            );
            if (data.episode_data) {
                this.episode_data = data.episode_data;
            }
        },
        async episodeLike(episode) {
            this.showProcessLoader(episode.episode_ref_no);
            let formData = new FormData();

            const data = await this.postRequest(
                Episode.addLikeBackendUrl +
                    "/" +
                    episode.episode_ref_no +
                    "/like",
                formData
            );
            this.hideProcessLoader(episode.episode_ref_no);
            this.episode_data = data.episode_data;
        },
        async episodeUnLike(episode) {
            this.showProcessLoader(episode.episode_ref_no);
            let formData = new FormData();
            formData.append("_method", "delete");

            const data = await this.postRequest(
                Episode.deleteLikeBackendUrl +
                    "/" +
                    episode.episode_ref_no +
                    "/like/" +
                    episode.liked_episode.episode_like_ref_no,
                formData
            );
            this.hideProcessLoader(episode.episode_ref_no);
            this.episode_data = data.episode_data;
        },
        async fetchEpisodeComments() {
            const episode_ref_no = this.$route.params.episode_ref_no;
            const data = await this.getRequest(
                Episode.fetchEpisodeCommentsUrl + "/" + episode_ref_no
            );
            if (data.episode_comment_data) {
                this.showEpisodeComments = episode_ref_no;
                this.episodeComments = data.episode_comment_data;
                this.commentNextPage = data.next_page;
                this.$nextTick(() => {
                    this.showComments = true;
                });
            }
        },
        async submitComment(val) {
            let formData = new FormData();
            if (this.episode_comment == "") {
                this.$toast.error("Please enter something!");
                return false;
            }
            formData.append("desc", this.episode_comment);
            formData.append("episode_ref_no", val.episode_ref_no);
            const data = await this.postRequest(
                Episode.addCommentBackendUrl,
                formData
            );
            if (data.episode_comment_data) {
                const originalState = [...this.episodecomments];
                originalState.unshift(data.episode_comment_data);
                this.episodecomments = originalState;
                this.episode_comment = "";
                this.$emit("updateCommentCount", "increment");
                this.$toast.error("Comment Added!");
            }
        },
        openDelete(comment) {
            const commentSelect = document.getElementById(
                comment.episode_comment_ref_no
            );
            commentSelect.classList.toggle("show");
        },
        openConfirm(comment) {
            this.openDeleteBox = true;
            this.deleteData = comment;
        },
        closeConfirmBox(payload) {
            this.openDeleteBox = payload;
            const commentSelect = document.getElementById(
                this.deleteData.episode_comment_ref_no
            );
            commentSelect.classList.toggle("show");
        },
        async deleteConfirm(payload) {
            this.openDeleteBox = payload;
            let formData = new FormData();

            formData.append("_method", "delete");
            formData.append("episode_ref_no", this.deleteData.episode_ref_no);
            formData.append(
                "episode_comment_ref_no",
                this.deleteData.episode_comment_ref_no
            );
            this.$store.commit("showLoader", true);

            const data = await this.postRequest(
                Episode.deleteCommentBackendUrl,
                formData
            );
            if (data.episode_comment_data) {
                const index = this.episodecomments.indexOf(this.deleteData);
                this.episodecomments.splice(index, 1);
                this.$emit("updateCommentCount", "decrement");
                this.$toast.error("Comment Deleted!");
            } else {
                this.$toast.error("Unable to delete!");
            }
        },
        async openLikeModal(episode) {
            this.$store.commit("showLoader", true);
            const url =
                Episode.fetchLikesBackendUrl +
                "/" +
                episode.episode_ref_no +
                "/like";
            const data = await this.getRequest(url);
            this.likes = data.episode_like_data;
            this.$store.commit("likeModal", true);
        },
        async loadMoreComments(episode) {
            const url = this.commentNextPage;
            const data = await this.getRequest(url);
            if (data.episode_comment_data) {
                this.showComments = false;
                this.showEpisodeComments = episode.episode_ref_no;
                const comments = data.episode_comment_data;
                const originalState = [...this.episodeComments];
                comments.map(comment => {
                    originalState.push(comment);
                });
                this.episodeComments = originalState;
                this.commentNextPage = data.next_page;
                this.$nextTick(() => {
                    this.showComments = true;
                });
            }
        }
    }
};
