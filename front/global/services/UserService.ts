import Api from "./Api";

export default {
    getAllUsers() {
        return Api().get("users")
    },
    getUserByID(id) {
        return Api().get("users/"+id)
    },
    updateUser(id, data) {
        return Api().put("users/"+id, data)
    },
    deleteUser(id) {
        return Api().delete("users/"+id)
    },
};
