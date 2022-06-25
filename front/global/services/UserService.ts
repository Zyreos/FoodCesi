import Api from "./Api";

export default {
    getAllUsers() {
        return Api().get("users")
    },
    deleteUser(id) {
        return Api().delete("users/"+id)
    },
};
