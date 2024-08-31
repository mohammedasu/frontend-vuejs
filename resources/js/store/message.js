import { fetchMessageBackendUrl, markReadMessagesBackendUrl } from "../path";
import { headerConfig } from "../setHeaders";

export default {
    namespaced: true,
    state: {
        selectedContact: "",
        messages: [],
        contacts: [],
        msgNextPage: "",
        loadmore: false,
        currentPage: 0,
        previousPage: 0
    },
    getters: {
        getContacts(state) {
            return state.contacts;
        },
        getSelectedContact(state) {
            return state.selectedContact;
        },
        getMessages(state) {
            return state.messages;
        }
    },

    mutations: {
        fetchMessage(state, messages) {
            state.messages = messages;
        },
        fetchContacts(state, contacts) {
            state.contacts = contacts;
        },
        addMessage(state, message) {
            state.messages.push(message);
        },
        setContact(state, contactSet) {
            state.selectedContact = contactSet;
        },
        setNextPage(state, payload) {
            state.msgNextPage = payload.nextPage;
            state.currentPage = payload.currentPage;
        },
        setPreviousPage(state, data) {
            state.previousPage = data.currentPage - 1;
            state.loadmore = false;
        },
        setLoadMore(state, payload) {
            state.loadmore = payload;
        },
        addLoadMoreMessage(state, messages) {
            const originalState = [...state.messages];
            messages.map(message => {
                originalState.unshift(message);
            });
            state.messages = originalState;
        },
        updateUnreadCount(state, payload) {
            state.contacts = state.contacts.map(contact => {
                if (
                    contact.selected_user_ref_no == payload.user_ref_no ||
                    contact.user_ref_no == payload.user_ref_no
                ) {
                    if (payload.newCheck) {
                        contact.unread = 0;
                    } else {
                        contact.unread =
                            (contact.unread ? contact.unread : 0) + 1;
                        contact.latest_unread_msg_at = payload.created_at;

                        contact.lastMessage = {};
                        contact.lastMessage.decryptmessage=payload.completeMessage.message;
                        contact.lastMessage.message =
                            payload.completeMessage.message;
                        contact.lastMessage.lastMessageAt =
                            payload.completeMessage.created_at;
                    }
                    return contact;
                }

                return contact;
            });
        }
    },
    actions: {
        setMessageContact(context, payload) {
            context.commit("setContact", payload.selectedContact);
            const payloadSend = {};
            payloadSend.user_ref_no = payload.selectedContact.user_ref_no;
            payloadSend.newCheck = true;
            context.commit("updateUnreadCount", payloadSend);
        },
        async updateUnreadCountBackend(context, payload) {
            const formData = new FormData();
            formData.append("from_user_ref_no", payload.user_ref_no);
            await axios
                .post(markReadMessagesBackendUrl, formData, headerConfig)
                .then(
                    response => {
                        let data = response.data.data;
                    },
                    err => {
                        return false;
                    }
                );
        },
        async fetchMessages(context, payload) {
            context.commit("showLoader", true, { root: true });
            await axios
                .get(
                    fetchMessageBackendUrl +
                        "/" +
                        context.state.selectedContact.user_ref_no,
                    headerConfig
                )
                .then(
                    response => {
                        context.commit("showLoader", false, { root: true });

                        let data = response.data.data;
                        context.commit("fetchMessage", data.message_data);
                        context.commit("setNextPage", data);
                        context.commit("setPreviousPage", data);
                        context.dispatch("updateUnreadCountBackend", {
                            user_ref_no: payload.selectedContact.user_ref_no
                        });
                    },
                    err => {
                        context.commit("showLoader", false, { root: true });

                        return false;
                    }
                );
        },
        async loadMoreMessages(context, payload) {
            if (
                context.state.msgNextPage != "" &&
                context.state.msgNextPage != null &&
                context.state.previousPage != context.state.currentPage &&
                context.state.loadmore == true
            ) {
                await axios.get(context.state.msgNextPage, headerConfig).then(
                    response => {
                        let data = response.data.data;
                        context.commit("setLoadMore", false);
                        context.commit("setNextPage", data);
                        context.commit("setPreviousPage", data);
                        context.commit("addLoadMoreMessage", data.message_data);
                    },
                    err => {
                        return false;
                    }
                );
            }
        }
    }
};
