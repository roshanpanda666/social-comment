const{username,password}=process.env
export const connectionSRT="mongodb+srv://"+username+":"+password+"@cluster0.lcprelr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log(username);
console.log(password);