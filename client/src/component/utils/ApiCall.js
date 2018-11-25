import AuthService from './AuthService'

const Auth = new AuthService()

export default class ApiCall {
    deleteData = async(s) => {
        var response = await Auth.fetch('/api/delete/' + s, { method : "DELETE" })
        if(response.success){
            window.location = '/admin'
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }

    updateData = async(e) => {
        var response = await Auth.fetch('/api/update/' + e._id, {
            method: "POST",
            body: JSON.stringify(e)
        });

        if(response.success){
            window.location = "/admin"
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }

    addData = async(e) => {
        var response = await Auth.fetch('/api/add', {
            method: "POST",
            body: JSON.stringify(e)
        });

        if(response.success){
            window.location = "/admin"
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }

    requestUpdateData = async(e) => {
        var updateItem = {
            username: Auth.getUsername(),
            type: "update",
            item: e
        }
        console.log(updateItem)

        var response = await Auth.fetch('/api/request/add', {
            method: "POST",
            body: JSON.stringify(updateItem)
        });

        if(response.success){
            window.location = "/user"
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }

    requestAddData = async(e) => {
        var addItem = {
            username: Auth.getUsername(),
            type: "add",
            item: e
        }
        console.log(addItem)

        var response = await Auth.fetch('/api/request/add', {
            method: "POST",
            body: JSON.stringify(addItem)
        });

        if(response.success){
            window.location = "/user"
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }

    requestDeleteData = async(e) => {
        var addItem = {
            username: Auth.getUsername(),
            type: "delete",
            item: e
        }
        console.log(addItem)

        var response = await Auth.fetch('/api/request/add', {
            method: "POST",
            body: JSON.stringify(addItem)
        });

        if(response.success){
            window.location = "/user"
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }

    deleteRequestData = async(s) => {
        var response = await Auth.fetch('/api/request/delete/' + s, { method : "DELETE" })
        if(response.success){
            window.location = "/request"
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }
}