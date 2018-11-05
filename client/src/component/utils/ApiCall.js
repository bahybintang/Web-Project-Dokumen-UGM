import AuthService from './AuthService'

const Auth = new AuthService()

export default class ApiCall {
    deleteData = async(s) => {
        var response = await Auth.fetch('/api/delete/' + s, { method : "DELETE" })
        if(response.success){
            alert("Data deleted")
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
            alert("Data updated!")
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
            alert("Data added!")
            window.location = "/admin"
            return true
        }
        else {
            alert(response.message)
            return false
        }
    }
}