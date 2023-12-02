import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"

// register
export const registerAPI=async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/users/register`,user,"")
}
// login
export const loginAPI=async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/users/login`,user,"")
}
// add product
export const addProductAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/products/add`,reqBody,reqHeader)
}
// user products
export const userProductsAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/products/user-products`,"",reqHeader)
}
// all projects
export const allProductsAPI=async(searchKey,searchLoc)=>{
    return await commonAPI("GET",`${BASE_URL}/products/all-products?search=${searchKey}&&loc=${searchLoc}`,"","")
}
// edit products
export const editProductAPI = async(productId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/products/edit/${productId}`,reqBody,reqHeader)
}
// delete products
export const deleteProductAPI=async(productId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/products/remove/${productId}`,{},reqHeader)
}
// add review
export const addReview=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/ratings/add`,reqBody,reqHeader)
}
// get reviews
export const getReviews=async()=>{
    return await commonAPI("GET",`${BASE_URL}/ratings/getratings`,"","")
}
// add request
export const addRequestAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/requests/add`,reqBody,reqHeader)
}
// get requests
export const getRequestAPI=async()=>{
    return await commonAPI("GET",`${BASE_URL}/requests/getrequests`,"","")
}
// delete request
export const deleteRequestAPI=async(requestId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/requests/remove/${requestId}`,{},reqHeader)

}

// add chat
export const addChatAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/chat/addchat`,reqBody,reqHeader)
}
// get chat
export const getMessageAPI=async()=>{
    return await commonAPI("GET",`${BASE_URL}/chat/getchat`,"","")
}