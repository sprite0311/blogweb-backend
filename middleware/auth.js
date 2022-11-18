import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    console.log(req.userId)
    try {
        const token = await req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500

        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.SECRET_KEY)
            req.userId = decodedData?.id
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth