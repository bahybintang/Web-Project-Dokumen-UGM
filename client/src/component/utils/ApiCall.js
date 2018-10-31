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
}