const getSuccessResponseBody = redirectUri => `
    <HTML>
    <HEAD>
        <META HTTP-EQUIV="Refresh" CONTENT="0; URL=${redirectUri}">
        <TITLE>Success</TITLE>
    </HEAD>
    <BODY>
        <H1>Success Email Confirmation</H1>
        <A HREF="http://www.google.com/">here</A>.
    </BODY>
    </HTML>
`;

exports.handler = (event, context, callback) => {
    const err = null;
    
    const {
        client_id        : clientId,
        user_name        : userName,
        confirmation_code: confirmationCode,
        redirect_uri     : redirectUri
    } = event.queryStringParameters;
    
    console.log(clientId, userName, confirmationCode, redirectUri);
    
    if (!clientId)
        err = "client_id param is required";
    if (!userName)
        err = "user_name param is required";
    if (!confirmationCode)
        err = "confirmation_code param is required";
    if (!redirectUri)
        err = "redirect_uri param is required";
    
    callback(
        null, 
        {
            statusCode: err ? "400" : "301",
            body: err ? err : getSuccessResponseBody(redirectUri),
            headers: {
                "Content-Type": err ? "application/json" : "text/html; charset=UTF-8",
            },
        }
    );
};
